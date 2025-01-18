const URL = require("../helper/MainHelper");
const axios = require("axios");
const cheerio = require("cheerio");

exports.index = async (req, res) => {
    try {
        const response = await axios.get(URL.github_URL);
        const list = [];
        const $ = cheerio.load(response.data);
        const gitHub = URL.github_URL;
        $(".js-profile-editable-replace").each((i, e) => {
            const fullName = $(e).find("span.vcard-fullname").text();
            const userName = $(e).find("span.vcard-username").text();
            const imgProfile = $(e).find("a > img.avatar-user").attr("src");
            const desc = $(e).find(".user-profile-bio > div").text();
            const followers = $(e).find("div.mb-3 > a:nth-child(1) > span").text();
            const following = $(e).find("div.mb-3 > a:nth-child(2) > span").text();
            const organization = $(e).find("ul > li:nth-child(1) > span > div").text();
            const location = $(e).find("ul > li:nth-child(2) > span").text();
            const url = $(e).find("ul > li:nth-child(3) > a").attr("href");
            const socialLink = $(e).find("ul > li:nth-child(4) > a").attr("href");

            //push scrape results to variable list
            list.push({
                userName,
                fullName,
                imgProfile,
                desc
            },
                {
                    followers,
                    following
                },
                {
                    organization,
                    location,
                    url,
                    socialLink,
                    gitHub
                })
        })
        //send json response
        res.json([
            {
                response: "author",
                message: "this route for response api author",
            },
            {
                author: list,
                support: "https://ko-fi.com/X8X031K5P"
            }
        ])
    } catch (error) {
        res.send(error.response.status);
    }
};
