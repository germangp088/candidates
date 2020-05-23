'use strict'
import express from 'express'
const router = express.Router()

const candidates: any[] = []

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
    const findMatchs = (candidate: any) => {
      let match = 0
      skillSearch.forEach((skill: string) => {
        if (candidate.skills.includes(skill)) {
          match++
        }
      })
      return match
    }
    let candidatesMatch = candidates.filter((candidate: any) => findMatchs(candidate) > 0)
    if (candidatesMatch.length == 0) {
      res.status(404).send(candidatesMatch)
    }

    candidatesMatch = candidatesMatch.map((candidate: any) => {
      const skills: string[] = []
      skillSearch.forEach((skill: string) => {
        if (candidate.skills.includes(skill)) {
          skills.push(skill)
        }
      })
      return {
        id: candidate.id,
        name: candidate.name,
        skills: skills
      }
    })

    candidatesMatch
      .sort((a: any, b: any) => {
        return a.skills.length - b.skills.length
      })
      .reverse()

    res.status(200).send(candidatesMatch[0])
  }
})

export default router