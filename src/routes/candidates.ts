'use strict'
import express from 'express'
import { Candidate } from '../models/candidate'
import { validateGet, validatPost } from '../utils/validator'
import { RecruitingService } from '../services/recruiting'

const router = express.Router()
const recruitingService: RecruitingService = new RecruitingService()

router.post('/candidates', validatPost, (req: express.Request, res: express.Response) => {
  recruitingService.addCandidate(req.body)
  res.status(201).end()
})

router.get('/candidates/search', validateGet, (req: express.Request, res: express.Response) => {
  const skills = req.query.skills
  const skillSearch = skills.toString().split(',')

  let candidatesMatch = recruitingService.getCandidatesMatch(skillSearch)

  if (candidatesMatch.length == 0) {
    res.status(404).send(candidatesMatch)
  }

  candidatesMatch = recruitingService.removeSkills(candidatesMatch, skillSearch)

  res.status(200).send(recruitingService.getBestMatch(candidatesMatch))
})

export default router