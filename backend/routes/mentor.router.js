//import _ from "lodash"
const lodash = require("lodash");
const express = require("express");
const router = express.Router();
var Mentor = require("../models/mentor.model");
var { mentorSchema } = require("../utils/joiSchemas");
const { ObjectId } = require("mongodb");

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
  mentorSchema.validate(mentor);
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
  let mentors = [];
  var matched_list = await Mentor.find({
    language: language,
    time: { $in: [...times] },
    "Classes.code": code,
    approved: true,
  });
  //console.log("matched list", matched_list)
  return matched_list;
  /* .then((res)=> {
        //console.log(res)
        mentors = [...mentors, ...res]
        //console.log(mentors)
      }) */
  //.catch((err) => res.status(400).json("Error: " + err));
  /*  }) */
}

router.route("/signup/findmatches/").post(async (req, res) => {
  //const learner_id = req.body._id
  //const phone = req.body.phone;
  //console.log("hii");
  const language = req.body.language;
  const times = req.body.times;
  //console.log(req.body)
  let codes = [];
  const subjects = req.body.subjects;
  //console.log(subjects);
  //codes = subjects;
  subjects.forEach((subject) => {
    codes.push(subject.code);
  });

  //codes = ["HIN8"];

  console.log(language, times, codes);
  let mentors = [];
  let counter = 0;
  for (let code of codes) {
    //console.log(counter++)
    try {
      var response = await getMentors(language, times, code);
      /* .then(() => res.json("LALALAALALALAL"))
            .catch((err) => res.status(400).json("Error: " + err));; */
      //console.log("response", response);
      //choose 1 among many responses and append to mentors
      var theChosenMentor = -1;
      let min = 1000; //maximum number of students is assumed to be 1000 (realistic assumption)
      for (let x of response) {
        let all_Classes = x.Classes;
        for (let Class of all_Classes) {
          //console.log(Class)
          if (Class.code == code) {
            //console.log(code, Class.students.length)
            if (Class.students.length <= min)
              theChosenMentor = x._id.toString();
          }
        }
        //console.log("The chosen mentor", theChosenMentor)
        //console.log(x.Classes)
        /* if(Class.code == code)
                {
                    console.log("Mentor match name", Class.students)
                } */
      }
      // mentors ordered accordong to class codes order
      mentors.push(theChosenMentor);

      console.log(mentors);
    } catch (err) {
      console.log(err);
    }
  }
  res.json(mentors);

  //var matched_list = await Mentor.find({ name: "Elon Musk" })
  //let myVar = setTimeout(function(){ alert("Hello");}, 1000)
  //.then(() => res.json(mentors));
  //return "If youre happy and you know it"
  //console.log("TEST")
});

/*
router.route("/findmatches/addedsubjects").post(async (req, res) => {

  const language = req.body.language;
  const times = req.body.times;
  const subName = 
  let codes = [];
  const subjects = req.body.subjects;
  subjects.forEach((subject) => {
    codes.push(subject.code);
  });

  console.log(language, times, codes);
  let mentors = [];
  let counter = 0;
  for (let code of codes) {
    //console.log(counter++)
    try {
      var response = await getMentors(language, times, code);
      /* .then(() => res.json("LALALAALALALAL"))
            .catch((err) => res.status(400).json("Error: " + err));;
      //console.log("response", response);
      //choose 1 among many responses and append to mentors
      var theChosenMentor = -1;
      let min = 1000; //maximum number of students is assumed to be 1000 (realistic assumption)
      for (let x of response) {
        let all_Classes = x.Classes;
        for (let Class of all_Classes) {
          //console.log(Class)
          if (Class.code == code) {
            //console.log(code, Class.students.length)
            if (Class.students.length <= min)
              theChosenMentor = x._id.toString();
          }
        }
        //console.log("The chosen mentor", theChosenMentor)
        //console.log(x.Classes)
        /* if(Class.code == code)
                {
                    console.log("Mentor match name", Class.students)
                } 
      }
      // mentors ordered accordong to class codes order
      mentors.push(theChosenMentor);

      console.log(mentors);
    } catch (err) {
      console.log(err);
    }
  }
  res.json(mentors);

  //var matched_list = await Mentor.find({ name: "Elon Musk" })
  //let myVar = setTimeout(function(){ alert("Hello");}, 1000)
  //.then(() => res.json(mentors));
  //return "If youre happy and you know it"
  //console.log("TEST")
});
*/

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

/*
router.route("/assign/update/:phone").post((req, res) => {
  //console.log(req)
  //console.log("req.body", req.body)
  Mentor.find({ phone: req.body.phone })
    .then((mentors) => {
      //console.log("Learners", learners)
      //console.log(users.length)
      if (mentors.length == 0) {
        console.log("mentor not found");
        return;
      }
      let mentor = mentors[0];
      mentor.name = "HAPPYIER";
      //learner.subjects = req.body.subjects
      //console.log(learner.subjects)
      //assign values here
      //console.log("User", user)
       mentor
              .save()
              .then(() => res.json("Mentor status updated!"))
              .catch((err) => res.status(400).json("Error: " + err)); 
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
*/

router.route("/updateId/:id").post((req, res) => {
  Mentor.findById(req.params.id)
    .then((mentor) => {
      mentor.name = req.body.name;

      name
        .save()
        .then(() => res.json("mentor updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

// normal update by phone
router.route("/assign/update-by-phone/:phone").post(async (req, res) => {
  let phone = req.params.phone;
  let data = req.body;
  console.log(phone, data);
  await Mentor.findOneAndUpdate({ phone }, { $set: data });
  res.json("ok");
});

// normal update by id
router.route("/update-by-id/:id").post(async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  console.log(id, data);
  await Mentor.findByIdAndUpdate(id, { $set: data });
  res.json("ok");
});

// push students ID to mentor used after matching
router.route("/assign/update-by-id/:id").post(async (req, res) => {
  let mentor_id = req.params.id;
  let class_code = req.body.class_code;
  let learner_id = req.body.learner_id;

  let mentor = await Mentor.findById(mentor_id);

  let classes = mentor.Classes;

  for (let i = 0; i < classes.length; i++) {
    if (classes[i].code === class_code) {
      mentor.Classes[i].students.push(learner_id);
    }
  }

  mentor
    .save()
    .then(() => res.json("Mentor status updated!"))
    .catch((err) => res.status(400).json("Error: " + err));

  //console.log(id, data);
  //await Mentor.findByIdAndUpdate(id, { $set: data });
  //res.json("ok");
});

router.route("/remove-learner/:id").post(async (req, res) => {
  let mentor_id = req.params.id;
  let class_code = req.body.class_code;
  let learner_id = req.body.learner_id;

  console.log("HELLLLOOO2 : ", mentor_id, class_code, learner_id);

  let mentor = await Mentor.findById(mentor_id);

  let classes = mentor.Classes;

  for (let i = 0; i < classes.length; i++) {
    if (classes[i].code === class_code) {
      const stu_tmp = mentor.Classes[i].students.filter(
        (stu) => stu._id != learner_id
      );
      console.log("HELLOO : ", stu_tmp);
      mentor.Classes[i].students = stu_tmp;
    }
  }

  mentor
    .save()
    .then(() => res.json("Mentor status updated!"))
    .catch((err) => res.status(400).json("Error: " + err));

  //console.log(id, data);
  //await Mentor.findByIdAndUpdate(id, { $set: data });
  //res.json("ok");
});

router.route("/get-data/id/:id").get(async (req, res) => {
  let id = req.params.id;
  let data = await Mentor.findById(id).exec();
  res.json(data);
});

router.route("/get-data/phone/:phone").get(async (req, res) => {
  let phone = req.params.phone;
  let data = await Mentor.findOne({ phone }).exec();
  res.json(data);
});
