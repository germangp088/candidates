'use strict'
import express from 'express'

const logger = require('log');

export const validatPost = (req: express.Request, res: express.Response, next: any) => {
	logger.debug('Validate method')

	const { name, skills } = req.body
	const errors = [];

	if(!name){
		errors.push("Name is necesary.")
	}

	validateSkills(skills, errors)
	validateErrors(errors, res, next)
}

export const validateGet = (req: express.Request, res: express.Response, next: any) => {
	logger.debug('Validate method')

	const { skills } = req.query
	const errors: string[] = [];

	validateSkills(skills, errors)
	validateErrors(errors, res, next)
}

const validateSkills = (skills: any, errors: string[]) => {
	if(!skills || skills.length == 0){
		errors.push("Skillset is necessary.")
	}
}

const validateErrors = (errors: string[], res: express.Response, next: any) => {
	if(errors.length > 0) {
		logger.error('Validate errors:', errors)
		return res.status(400).json({ errors });
	} else {
		next()
	}
}