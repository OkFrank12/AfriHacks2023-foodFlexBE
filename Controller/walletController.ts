import { Request, Response } from "express";
import authModel from "../model/authModel";
import walletModel from "../model/walletModel";
import https from "https";
import axios from "axios";

export const requestLoan = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const { amount } = req.body;
    const user = await authModel.findById(userID);
    if (user) {
      if (user?.loan === 0) {
        const wallet = await walletModel.create({
          amount: parseInt(amount),
          email: user.email,
        });

        let interestRate: any = amount * 0.026;
        let totalAmount: any = parseInt(interestRate) + parseInt(amount);

        user.wallet += amount;
        user.loan = -parseInt(totalAmount);

        await user.save();

        return res.status(201).json({
          message: "Requested Loan Successfully",
          data: wallet,
        });
      } else {
        return res.status(400).json({
          message: `${user.userName}, please repay your loan...`,
        });
      }
    } else {
      return res.status(400).json({
        message: `You are not on our record...`,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const payLoan = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const { amount } = req.body;
    const user = await authModel.findById(userID);

    if (user?.loan === 0 || user?.loan! > amount) {
      return res.status(200).json({
        message: `Congrats ${user?.userName} you have completed your loan`,
      });
    } else {
      const params = JSON.stringify({
        email: user?.email,
        amount: parseInt(amount) * 100,
        userID,
      });
      const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
          Authorization:
            "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
          "Content-Type": "application/json",
        },
      };

      const ask = https
        .request(options, (resp) => {
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });

          resp.on("end", () => {
            console.log(JSON.parse(data));
            res.status(200).json({
              message: "Payment successful",
              data: JSON.parse(data),
            });
            user!.loan += amount;
            user?.save();
          });
        })

        .on("error", (error) => {
          console.error(error);
        });

      ask.write(params);
      ask.end();
    }
    return res;
  } catch (error: any) {
    return res.status(200).json({
      message: error.message,
    });
  }
};

export const checkoutWithPayStack = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const { amount } = req.body;
    const user = await authModel.findById(userID);

    const params = JSON.stringify({
      email: user?.email,
      amount: parseInt(amount) * 100,
      userID,
    });
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization:
          "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
        "Content-Type": "application/json",
      },
    };

    const ask = https
      .request(options, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          console.log(JSON.parse(data));
          res.status(200).json({
            message: "Payment successful",
            data: JSON.parse(data),
          });
        });
      })

      .on("error", (error) => {
        console.error(error);
      });

    ask.write(params);
    ask.end();

    return res;
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const checkBIN = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, ip, name, bin } = req.body;
    const data = {
      config: {
        ip: {
          include: "flags,history,id",
          version: "v1",
        },
        aml: {
          version: "v1",
          monitoring_required: false,
          monitoring_schedule: "MONTHLY",
          fuzzy_enabled: false,
          fuzzy_config: {
            phonetic_search_enabled: true,
            edit_distance_enabled: false,
            scoring: {
              result_limit: 10,
              score_threshold: 0.585,
            },
          },
          timeout: 2000,
          sources: {
            sanction_enabled: true,
            pep_enabled: true,
            watchlist_enabled: true,
            crimelist_enabled: true,
          },
        },
        email: {
          include: "flags,history,id",
          version: "v2",
        },
        phone: {
          include: "flags,history,id",
          version: "v1",
        },
        ip_api: false,
        aml_api: true,
        email_api: false,
        phone_api: false,
        device_fingerprinting: false,
        response_fields:
          "id,state,fraud_score,ip_details,email_details,phone_details,bin_details,version,applied_rules,device_details,calculation_time,seon_id,aml_details",
      },
      ip,
      action_type: "withdrawal",
      transaction_id: "",
      affiliate_id: "",
      email,
      email_domain: "",
      password_hash: "",
      user_fullname: name,
      user_firstname: name,
      user_middlename: "",
      user_lastname: "",
      user_dob: "",
      user_pob: "Budapest",
      user_photoid_number: "56789",
      user_id: "123456",
      user_name: name,
      user_category: "",
      user_account_status: "",
      user_created: "",
      user_country: "",
      user_city: "",
      user_region: "",
      user_zip: "",
      user_street: "",
      user_street2: "",
      session: "",
      payment_mode: "",
      card_fullname: "",
      card_bin: bin,
      card_hash: "",
      card_last: "",
      card_expire: "",
      avs_result: "",
      cvv_result: "",
      sca_method: "",
      user_bank_account: "",
      user_bank_name: "",
      user_balance: "",
      user_verification_level: "",
      status_3d: "",
      regulation: "",
      payment_provider: "",
      phone_number: "",
      transaction_type: "",
      transaction_amount: "",
      transaction_currency: "",
      merchant_id: "",
      details_url: "",
      custom_fields: {
        is_intangible_item: "",
        is_pay_on_delivery: "",
        departure_airport: "",
        days_to_board: null,
        arrival_airport: "",
      },
    };
    const URL = process.env.AI_URL!;

    const realData = await axios.post(URL, JSON.stringify(data), {
      headers: {
        "x-api-key": process.env.AI_KEY!,
        "Content-Type": "Application/json",
      },
    });

    return res.status(201).send({
      message: "Gotten",
      data: realData.data,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
