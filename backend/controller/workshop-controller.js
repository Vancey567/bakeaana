const Workshop = require('../model/workshop-model');
const Attendees = require('../model/attendees-model');

function workshop() {
    return {
        async registerAttendee(req, res) {            
            let { user, workshop } = req.body;

            if(!user || !workshop) {
                return res.json({message: 'All fields in the mandatory'});
            }

            const attendeeObj = new Attendees({
                user: user,
                workshop: workshop
            });

            attendeeObj.save()
            .then(() => {
                console.log("Registered Successfully");
                res.json({message: 'Registered Successfully'})
            }).catch(err => {
                console.log(err);
                res.json({ message: "Problem joining the workshop!!" });
            })
        },

        async showWorkshop(req, res) {
            const allWorkshops = await Workshop.find();
            if(allWorkshops !== null) {
                // res.send(allWorkshops);
                res.json({ workshops: allWorkshops });
            } else {
                res.json({ message: "No workshop available" });
            }
        },

        async createWorkshop(req, res) {
            const { title, description, mode, address, date, duration,  learnings } = req.body;

            if(!title || !description || !date || !duration || !learnings) {
                res.json({ message: 'All fields are mandatory' });
                return;
            }

            let learningsArray = learnings.split(',');
            console.log(learningsArray);

            let workshopObj = new Workshop({
                title: title,
                description: description,
                mode: mode,
                address: address,
                date: date,
                duration: duration,
                learnings: learningsArray,
            });
            
            workshopObj.save()
            .then(() => {
                res.send({message: "Workshop Created"});
            }).catch((err) => {
                console.log(err);
                res.send({message: "Problem creating the workshop!!"});
            })
        },

        async attendees(req, res) {
            const allAttendees = await Attendees.find().populate('user').populate('workshop');
            console.log(allAttendees);
            if(allAttendees !== null) {
                res.json({ attendees: allAttendees });
            } else {
                res.json({ message: "No attendese available"});
            }
        },
    }
}

module.exports = workshop;