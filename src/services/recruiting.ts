import { Candidate } from "../models/candidate";

export class RecruitingService {
    private _candidates: Candidate[] = []

    /**
     * addCandidate
     * @param candidate 
     */
    public addCandidate(candidate: Candidate) {
        this._candidates.push(new Candidate(candidate.name, candidate.skills))
    }

    /**
     * getCandidatesMatch
     * @param skillSearch 
     */
    public getCandidatesMatch(skillSearch: string[]) {
        return this._candidates.filter((candidate: Candidate) => this.findMatchs(candidate, skillSearch) > 0)
    }

    /**
     * removeSkills
     * @param candidates 
     * @param skillSearch 
     */
    public removeSkills(candidates: Candidate[], skillSearch: string[]) {
        return candidates.map((candidate: Candidate) => {
            const skills: string[] = []
            skillSearch.forEach((skill: string) => {
              if (candidate.skills.includes(skill)) {
                skills.push(skill)
              }
            })
            candidate.skills = skills
            return candidate;
        })
    }

    /**
     * getBestMatch
     * @param candidates 
     */
    public getBestMatch(candidates: Candidate[]) {
        candidates
        .sort((a: Candidate, b: Candidate) => a.skills.length - b.skills.length)
        .reverse()

        return candidates[0].toObject()
    }

    private findMatchs(candidate: Candidate, skillSearch: string[]) {
        let match = 0
        skillSearch.forEach((skill: string) => {
          if (candidate.skills.includes(skill)) {
            match++
          }
        })
        return match
    }

    get candidates(): Candidate[] {
        return this._candidates;
    }
}