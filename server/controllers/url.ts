import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import Url from "../models/Url";
import { Request, Response } from "express";
import mongoose, { SortOrder, mongo } from "mongoose";

const getAllLinks = async (req: Request, res: Response) => {
  const validSortFields = [
    "createdBy",
    "originalUrl",
    "shortUrl",
    "clickCount",
    "createdAt",
    "updatedAt",
    "expirationDate",
  ];
  const getExpiredAlso = req.query.expired as string;
  const expired = getExpiredAlso === "true";
  const sortField = (req.query.sortBy as string) || "createdAt";
  const sortOrder: SortOrder = (req.query.order as string) === "desc" ? -1 : 1;
  const sortObject: { [key: string]: SortOrder } = {};
  sortObject[sortField] = sortOrder;

  let query: {
    createdBy: mongoose.Types.ObjectId;
    hasExpirationDate?: boolean;
    expirationDate?: { $gte: Date };
  } = { createdBy: req.user.userId};
  if (!expired) {
    query = { ...query, hasExpirationDate:true, expirationDate: { $gte: new Date() } };
  }
  const links = await Url.find(query).sort(sortObject);
  res.status(StatusCodes.OK).json({ count: links.length, links });
};

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
  res.status(StatusCodes.OK).json({ link });
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

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  // const job = await Job.findById(jobId);//incorrect approach because other user also have tokens so they can see this job
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (company === "" || position === "") {
    throw new BadRequestError("Company or Positions field cant be empty");
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true },
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
