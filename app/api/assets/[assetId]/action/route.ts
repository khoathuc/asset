import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parsing
  },
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({ multiples: true });

  const formData: any = new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject("error");
      }
      resolve({ fields, files });
    });
  });

  try {
    const { fields, files } = await formData;
  } catch (e) {
    res.status(400).send({ status: "invalid submission" });
    return;
  }
}
