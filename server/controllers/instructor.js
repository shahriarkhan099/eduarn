
import User from "../models/user";
// import stripe from "stripe";
import queryString from "query-string";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

export const makeInstructor = async (req, res) => {
 try {
    const user = await User.findById(req.user._id).exec();

    if(!user.stripeAccountId) {
        const account =await stripe.accounts.create({type: "express"});
        user.stripeAccountId = account.id;
        user.save();
    }

    let accountLink = await stripe.accountLinks.create({
        account: user.stripeAccountId,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,
        type: "account_onboarding",
    });

    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email,
    });

    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
 } catch (err) {
     console.log("MAKE INSTRUCTOR ERR ",err);
 }
};

export const getAccountStatus = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).exec();
        // const account = await stripe.accounts.retrieve(user.stripeAccountId);
        // console.log("Account => ", account);
        const statusUpdated = await User.findByIdAndUpdate(user._id, {
            stripeSeller: user,
            $addToSet: {role: "Instructor"},
        }, {new: true}).select("-password").exec();
        // statusUpdated.password = undefined;
        res.json(statusUpdated);
        // if (!account.charges_enabled) {
        //     return res.status(401).send("Unauthorized");
        // } else {
        //   //
        // }
    } catch (err) {
        console.log(err)
    }
};

