const { response } = require('express');
const { mongoose } = require('mongoose');

const Filling = require('../models/fillings');

const getFillings = async(req, res = response) => {
    const fillings = await Filling.find().populate();

    res.json({
        ok: true,
        fillings
    })
}

const storeFilling = async(req, res = response) => {

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

const updateFilling = async(req, res = response) => {
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

const deleteFilling = async(req, res = response) => {
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

module.exports = {
    getFillings,
    storeFilling,
    updateFilling,
    deleteFilling
}