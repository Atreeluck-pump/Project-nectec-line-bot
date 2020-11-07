module.exports = (req, res) => {
    const name = req.body.name
    const file = req.body.file
    console.log(file)
    const result = {
        message : name
    }
    res.json(result)
    res.status(201).end()
}