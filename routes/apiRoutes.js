
const store = require("../db/store");
const router = require("express").Router();

// get,put,post, delete

router.get("/notes", (req, res) => {
    store
        .getNotes()
        .then((notes) => {
            return res.json(notes)
        })
        .catch((err) => {
            res.status(500).json(err)
        });
});
router.post("/notes", (req, res) => {
    store
        .postNotes(req.body)
        console.log(note)
        .then((note) => {
            return res.json(note)
        })
        .catch((err) => {
            res.status(500).json(err)
        });
});

router.delete("/notes/:id", (req, res) => {
    store
        .deleteNotes(req.params.id)
        .then(() => res.json({
            ok: true
        }))
        .catch((err) => {
            res.status(500).json(err)
        });
});

module.exports = router;