'use strict';

const express = require('express');
const app = express();
app.use(express.json());

let candidates = []

app.post('/candidates', function(req, res) {
    if(!req.body.id || !req.body.name || !req.body.skills){
        res.status(400).end()
    }
    candidates.push(req.body)
    res.status(201).end()
});

app.get('/candidates/search', function(req, res) {
    const skills = req.query.skills
    if(!skills) {
        res.status(400).end()
    } else {
        const skillSearch = skills.split(',')
        const findMatchs = (candidate) => {
            let match = 0;
            skillSearch.forEach(skill => {
                if(candidate.skills.includes(skill)){
                    match++;
                }
            })
            return match
        }
        let candidatesMatch = candidates.filter(candidate => findMatchs(candidate) > 0);
        if(candidatesMatch.length == 0) {
            res.status(404).send(candidatesMatch);
        }

        candidatesMatch = candidatesMatch.map(candidate => {
            const skills = []
            skillSearch.forEach(skill => {
                if(candidate.skills.includes(skill)){
                    skills.push(skill)
                }
            })
            return {
                id: candidate.id,
                name: candidate.name,
                skills: skills
            }
        })
        console.log({candidatesMatch});

        candidatesMatch.sort((a, b) => {
            return a.skills.length - b.skills.length;
        }).reverse();
        res.status(200).send(candidatesMatch[0]);
    }
});

app.listen(process.env.HTTP_PORT || 3000);