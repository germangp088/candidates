'use strict'
import express from 'express'
import { Candidate } from '../models/candidate'
const router = express.Router()

const candidates: Candidate[] = []

router.post('/candidates', function (req, res) {
  if (!req.body.id || !req.body.name || !req.body.skills) {
    res.status(400).end()
  }
  candidates.push(req.body)
  res.status(201).end()
})

router.get('/candidates/search', function (req: express.Request, res: express.Response) {
  const skills = req.query.skills
  if (!skills) {
    res.status(400).end()
  } else {
    const skillSearch = skills.toString().split(',')
    const findMatchs = (candidate: Candidate) => {
      let match = 0
      skillSearch.forEach((skill: string) => {
        if (candidate.skills.includes(skill)) {
          match++
        }
      })
      return match
    }
    let candidatesMatch = candidates.filter((candidate: Candidate) => findMatchs(candidate) > 0)
    if (candidatesMatch.length == 0) {
      res.status(404).send(candidatesMatch)
    }

    candidatesMatch = candidatesMatch.map((candidate: Candidate) => {
      const skills: string[] = []
      skillSearch.forEach((skill: string) => {
        if (candidate.skills.includes(skill)) {
          skills.push(skill)
        }
      })
      candidate.skills = skills
      return candidate;
    })

    candidatesMatch
      .sort((a: Candidate, b: Candidate) => a.skills.length - b.skills.length)
      .reverse()

    res.status(200).send(candidatesMatch[0])
  }
})

export default router