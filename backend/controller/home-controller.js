const Workshop = require('../model/workshop-model')

function homeController() {
    return {
        async home(req, res) {
            const allWorkshop = await Workshop.find();
            console.log("home called");
            return res.render('index', { workshops: allWorkshop })
        }
    }
}

module.exports = homeController;