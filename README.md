# Lynk - URL Shortener
[Lynk](https://lynk-cx.onrender.com/) is a simple link shortener application that allows you to shorten long URLs into shorter links and QR codes. It also provides click statistics for shortened links, allowing you to track the number of clicks on each link. Lynk is built with Node.js, Express, and MongoDB. 

## Features
- Shorten long URLs
- Track click statistics for shortened links
- Customizable link aliases
- Generate QR codes for shortened links

## Setup
Install node.js and pnpm if you haven't already. Then follow the steps below to install and run Lynk on your local machine.
1. Clone the repository: `git clone https://github.com/Carbrex/lynk.git`
2. Install dependencies: `pnpm install`
3. Add environment variable to .env in server and client folders:
```
cp server/.env.example server/.env
cp client/.env.example client/.env
```
4. Start the server: `cd server && pnpm run dev`

### Alternative Setup with Docker
Alternatively, you can run Lynk using Docker. Follow the steps below to build and run the Docker image.
1. Clone the repository: `git clone https://github.com/Carbrex/lynk.git`
2. Add environment variable to .env in server and client folders:
```
cp server/.env.example server/.env
cp client/.env.example client/.env
```
3. Build the Docker image: `docker build -t lynk .`
4. Run the Docker container: `docker run -d -p 3000:3000 lynk`

## Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue on GitHub. If you would like to contribute code, please fork the repository and submit a pull request.

## License
This project is licensed under the [GNU General Public License v3.0](LICENSE).
