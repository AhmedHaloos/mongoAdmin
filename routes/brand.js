const router = require("express").Router();
const Brand = require("../models/Brand");


router.get(`/`, (req, res) => {

     Brand.find({})
        .then((brands) => {
            res.status(200).json(brands);
        })
        .catch((er) => {
            res.status(500).send(er)
        })
})
router.post(`/`, (req, res) => {

    
    new Brand(req.body).save()
        .then((response) => {
            res.status(200).json(res);
        })
        .catch((er) => {
            console.log(er);
            res.status(500).send(er)
        })
})

router.put(`/:id`, (req, res) => {

     Brand.updateOne({ _id: req.params.id }, rq.body, (err) => {

        if (err) {

            res.status(200).json(res);
        }
        else {

            res.status(500).send(er)
        }
    })

})
router.delete(`/:id`, (req, res) => {

     Brand.deleteOne({ _id: req.params.id })
        .then((brands) => {
            res.status(200).json(brands);
        })
        .catch((er) => {
            res.status(500).send(er)
        })
})


module.exports = router;