//import _ from "lodash"
const lodash = require("lodash");
const express = require("express");
const router = express.Router();
var Mentor = require("../models/mentor.model");
var {mentorSchema} = require("../utils/joiSchemas")

router.route("/login/submitmentor").get((req, res) => {
  Mentor.find()
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json("notfound"));
});

router.route("/signup/creatementor").post((req, res) => {
  const phone = req.body.phone;
  const name = req.body.name;
  const email = req.body.email;
  const language = req.body.language;
  const time = req.body.time;
  const approved = req.body.approved;

  //const deepCopyWithLodashCloneDeep = _.cloneDeep(nestedArray)
  //const Classes = lodash.cloneDeep(req.body.Classes); //not required
  const Classes = req.body.Classes;
  //console.log(req.body)
  //console.log("--------------------------------------------------");
  //console.log(req.body.Classes);
  //console.log(Classes[0].chapters);
  //console.log(Classes[0].chapters[0].subtopics);
  //console.log(req.body.Classes[0].name)
  //let t = req.body.Classes[0]
  //console.log(t.chapters)
  const profile_picture_url = req.body.profile_picture_url;

  const mentor = new Mentor({
    phone,
    name,
    email,
    language,
    time,
    approved,
    Classes,
    profile_picture_url,
  });
  //console.log(learner)
  mentorSchema.validate(mentor)
  mentor
    .save()
    .then(() => res.json("Added new mentor!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
/* router.route("/signup/findmatches/:phone").post((req, res) => {
    const phone = req.body.phone;
    const language = req.body.language;
    const times = req.body.times;
    const codes = [];
    console.log(req.body)
    const subjects = req.body.subjects;
    subjects.forEach((subject) => {
        codes.push(subject.code)
      })

    console.log(language, times, codes); 
    let mentors = [];
    let counter =0
    for (let code of codes) {
     
      console.log(counter++)

      const matched_mentors = Mentor.find({
        language: language,
        time: { $in: [...times] },
        code: code,
        approved: true
      })
      .then((res)=> {
        //console.log(matched_mentors))
        mentors = [...mentors, ...res]
        console.log(print, mentors)
      })
      .catch((err) => res.status(400).json("Error: " + err)) 

    }
    console.log("After", mentors)
    
  }); */

  /* async function getTodos(learner_id, language, times, code) {
    return new Promise(function(resolve, reject){
        Mentor.updateOne({ 
            language: langauge,
            time: { $in: [...times] },
            code: code,
            approved: true
        },{ 
            $push: { name: "ABCD" } 
        }, function(err,response){
            if (err) {
                reject(err);
            } else if (response.nModified === 0){
                reject("Id not found");
            } else {
                resolve(response.nModified + " items modified");
            }
        });
    });
} */

async function getMentors(language, times, code) {
    /* return new Promise(function(resolve, reject){ */
        let mentors = []
        var matched_list = await Mentor.find({ 
            language: language,
            time: { $in: [...times] },
            'Classes.code': code,
            approved: true
        })
        //console.log("matched list", matched_list)
        return matched_list
        /* .then((res)=> {
        //console.log(res)
        mentors = [...mentors, ...res]
        //console.log(mentors)
      }) */
      //.catch((err) => res.status(400).json("Error: " + err));
   /*  }) */
}

  router.route("/signup/findmatches/:phone").post(async (req, res) => {
    //const learner_id = req.body._id
    const phone = req.body.phone;
    const language = req.body.language;
    const times = req.body.times;
    let codes = [];
    //console.log(req.body)
    const subjects = req.body.subjects;
    subjects.forEach((subject) => {
        codes.push(subject.code)
      })

    codes = ['HIN6', 'TEL6']
    console.log(language, times, codes); 
    let mentors = [];
    let counter =0
    for(let code of codes)
    {
        //console.log(counter++)
        try {
            var response = await getMentors(language, times, code)
            /* .then(() => res.json("LALALAALALALAL"))
            .catch((err) => res.status(400).json("Error: " + err));; */
            //console.log("response", response);
            //choose 1 among many responses and append to mentors
            var theChosenMentor = -1;
            let max = 0;
            for(let x of response)
            {
                let all_Classes = x.Classes
                for(let Class of all_Classes)
                {
                    //console.log(Class)
                    if(Class.code == code)
                    {
                        //console.log(code, Class.students.length)
                        if(Class.students.length>=max)
                            theChosenMentor = x._id
                    }
                }
                //console.log("The chosen mentor", theChosenMentor)
                //console.log(x.Classes)
                /* if(Class.code == code)
                {
                    console.log("Mentor match name", Class.students)
                } */
            }
            mentors.push(theChosenMentor)
        }
        catch(err){
            console.log(err);
        }
    }
    var matched_list = await Mentor.find({name:"Elon Musk"})
    //let myVar = setTimeout(function(){ alert("Hello");}, 1000)
    .then(() => res.json(mentors))
    //return "If youre happy and you know it"
    //console.log("TEST")
});

    

    //Attempt 3 - bring all that match (language, times, codes) - then process
    /* router.route("/signup/findmatches/:phone").post(async (req, res) => {
        //const learner_id = req.body._id
        const phone = req.body.phone;
        const language = req.body.language;
        const times = req.body.times;
        let codes = [];
        console.log("Passed learner", req.body)
        const subjects = req.body.subjects;
        subjects.forEach((subject) => {
            codes.push(subject.code)
          })
    
        codes = ['HIN6', 'MAT10'] //temp
        console.log(language, times, codes); 
        let mentors = [];
        let counter =0

        Mentor.find({ 
            language: language,
            time: { $in: [...times] },
            'Classes.code': {$in: [...codes]},
            approved: true
        })
        .then((res)=> {
        console.log(res)
        //mentors = [...mentors, ...res]
        //console.log(mentors)
      })
      .catch((err) => res.status(400).json("Error: " + err));
    }); */
    
/* router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id).then(user => {

    user.username=req.body.username;
    user.password=req.body.password;

    user.save().then(() => res.json('Password updated!')).catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
}); */

module.exports = router;
