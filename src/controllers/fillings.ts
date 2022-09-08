import { Response, Request } from "express";
import mongoose from "mongoose";

const Filling = require('../models/fillings');

export const getFillings = async(req: Request, res: Response) => {
    const fillings = await Filling.find().populate();

    res.json({
        ok: true,
        fillings
    })
}

export const storeFilling = async(req: Request, res: Response) => {

    const id = new mongoose.Types.ObjectId();
    const filling = new Filling({
        id,
        ...req.body
    });

    try {
        const fillingDB = await filling.save();

        res.json({
            ok: true,
            filling: fillingDB
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: `Couldn't store the entry, please try again later.`
        })
    }

}

export const updateFilling = async(req:Request, res: Response) => {
    const id = req.params.id;

    try {
        const filling = await Filling.findById(id);

        if (!filling) {
            return res.status(404).json({
                ok: false,
                msg: `The filling you're looking for doesn't exists.`
            });
        }

        const changesFilling = {
            ...req.body,
            id
        }

        const updatedFilling = await Filling.findByIdAndUpdate(id, changesFilling, { new: true });

        res.json({
            ok: true,
            filling: updateFilling
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: `Couldn't update the entry, please try again later.`
        })
    }

}

export const deleteFilling = async(req:Request, res: Response) => {
    const id = req.params.id;

    try {
        const filling = await Filling.findById(id);

        if (!filling) {
            return res.status(404).json({
                ok: false,
                msg: `The filling doesn't exists.`
            });
        }

        await Filling.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: `Succesfully deleted`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: `Couldn't store the entry, please try again later.`
        })
    }
}
