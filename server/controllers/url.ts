import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors";
import Url from "../models/Url";
import User from "../models/User";
import sendMail from "../utils/sendMail";
import { Request, Response } from "express";
import mongoose, { SortOrder, mongo } from "mongoose";
import { IUser } from "../types/models";

const convertToObjectId = (id: string) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    throw new BadRequestError("Not a valid id");
  }
};

const getAllLinks = async (req: Request, res: Response) => {
  const validSortFields = [
    "originalUrl",
    "shortUrl",
    "clickCount",
    "createdAt",
    "updatedAt",
    "expirationDate",
  ];

  const getExpiredAlso = req.query.expired as string;
  const expired = getExpiredAlso === "true";
  let sortFields:string|string[] = (req.query.sort as string|string[]) || "createdAt";
  if (typeof sortFields === "string") {
    sortFields = [sortFields];
  }
  let sortField = (sortFields[0] as string)||"createdAt";// if multiple sort fields are provided, only the first one will be considered
  if (!validSortFields.includes(sortField)) {
    sortField = "createdAt";
  }

  const sortOrder: SortOrder = (req.query.order as string) === "desc" ? -1 : 1;// only provide single sort order
  const sortObject: { [key: string]: SortOrder } = {};
  sortObject[sortField] = sortOrder;

  let query: {
    createdBy: mongoose.Types.ObjectId;
    $or?: [
      { hasExpirationDate: boolean },
      { hasExpirationDate: boolean; expirationDate: { $gte: Date } },
    ];
  } = { createdBy: req.user.userId };
  if (!expired) {
    query = {
      ...query,
      $or: [
        { hasExpirationDate: false },
        { hasExpirationDate: true, expirationDate: { $gte: new Date(Date.now()) } },
      ],
    };
  }

  const links = await Url.find(query).sort(sortObject);
  
  res
    .status(StatusCodes.OK)
    .json({ count: links.length, links, msg: "Links successfully fetched" });
};

// not checked with postman
const editLink = async (req: Request, res: Response) => {
  const linkId = req.params.id;
  const userId = req.user.userId;
  const { hasExpirationDate, expirationDate } = req.body;
  if (hasExpirationDate && !expirationDate) {
    throw new BadRequestError(
      "If you provide hasExpirationDate, you must provide expiration date as well",
    );
  }
  const hasExpiration: boolean = hasExpirationDate === true;
  const expiration: Date = hasExpiration
    ? new Date(expirationDate)
    : new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
  const link = await Url.findOneAndUpdate(
    { _id: linkId, createdBy: userId },
    { hasExpiration, expiration },
    { new: true, runValidators: true },
  );
  if (!link) {
    throw new NotFoundError(`No link with id ${linkId}`);
  }
  res.status(StatusCodes.OK).json({ link, msg: "Link successfully updated" });
};

const redirectUrl = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

  const url = await Url.findOne({ shortUrl });
  if (!url) {
    throw new NotFoundError(`No url with short url ${shortUrl}`);
  }
  url.clickCount++;
  await url.save();
  res.redirect(url.originalUrl);
};

const createLink = async (req: Request, res: Response) => {
  let originalUrl: string = req.body.originalUrl;
  const expirationDate: string = req.body.expirationDate;
  const hasExpiration: boolean = req.body.hasExpirationDate === true;
  let shortUrl: string = req.body.shortUrl;

  if (!originalUrl || (hasExpiration && !expirationDate)) {
    throw new BadRequestError(
      "originalUrl, hasExpirationDate, expirationDate are required",
    );
  }

  if (!originalUrl.startsWith("http") && !originalUrl.startsWith("https")) {
    originalUrl = `http://${originalUrl}`;
  }

  let expiration: Date;
  if (hasExpiration) {
    expiration = new Date(expirationDate);

    if (isNaN(expiration.getTime()) || expiration < new Date()) {
      throw new BadRequestError(
        "Expiration date should be a valid future date",
      );
    }
  } else {
    expiration = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
  }

  if (shortUrl) {
    const existingUrl = await Url.findOne({ shortUrl });
    if (existingUrl) {
      throw new BadRequestError(`Short url ${shortUrl} has already been taken`);
    }
  } else {
    while (true) {
      shortUrl = Math.random().toString(36).substring(2, 8); // short url length is 6
      const existingUrl = await Url.findOne({ shortUrl });
      if (!existingUrl) {
        break;
      }
    }
  }

  const url = await Url.create({
    originalUrl,
    shortUrl,
    createdBy: req.user.userId,
    hasExpirationDate: hasExpiration,
    expirationDate: expiration,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ url, msg: "Link successfully created" });
};

const deleteLink = async (req: Request, res: Response) => {
  const linkId = convertToObjectId(req.params.id);
  const userId = req.user.userId;
  const link = await Url.findOneAndDelete({
    _id: linkId,
    createdBy: userId,
  });
  if (!link) {
    throw new NotFoundError(`No link with id ${linkId}`);
  }
  res.status(StatusCodes.OK).json({ link, msg: "Link successfully deleted" });
};

const deleteAllLinks = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const links = await Url.deleteMany({ createdBy: userId });
  res
    .status(StatusCodes.OK)
    .json({ count: links.deletedCount, msg: "Links successfully deleted" });
}

const reportLink = async (req: Request, res: Response) => {
  const shortUrl = req.params.shortUrl;
  const url = await Url.findOne({ shortUrl });
  if (!url) {
    throw new NotFoundError(`No url with short url ${shortUrl}`);
  }

  const user:IUser|null = await User.findById(req.user.userId);
  if (!user) {
    throw new UnauthenticatedError("Unauthorized");
  }
  // Send email to developer
  sendMail({
    from: process.env.SMTP_EMAIL_USER,
    to: process.env.MY_EMAIL,
    subject: "Short URL Reported",
    text: `Hi, the short url ${shortUrl} has been reported by a user with email ${user.email}. Please check the url and take necessary actions.`,
  });
  // Send confirmation email to the user
  sendMail({
    from: process.env.SMTP_EMAIL_USER,
    to: user.email,
    subject: "Short URL Reported",
    text: `Hi, the short url ${shortUrl} has been successfully reported to the developer. Your request will likely be processed within 72 hours.`,
  });

  res.status(StatusCodes.OK).json({
    url,
    msg: "The url has been successfully reported to the developer. Your request will likely be processed within 72 hours",
  });
};

export {
  getAllLinks,
  editLink,
  redirectUrl,
  createLink,
  deleteLink,
  reportLink,
  deleteAllLinks
};
