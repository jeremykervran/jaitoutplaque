class Jobs {
    constructor() {
        this.json = {}
        this.durationMax = 40
        this.setRandomJobs()
    }

    randomId(array) {
        return Math.floor(Math.random() * array.length)
    }

    removeAfterSlash(string) {
        const stringArray = string.split(' ')
        const slashPos = stringArray.indexOf('/')

        if (slashPos > -1) {
            if (1 === slashPos) {
                stringArray.splice(1, 2)
            }

            if (2 === slashPos) {
                stringArray.splice(2, 3)
            }
        }
        
        if (stringArray[stringArray.length-1].indexOf('(') > -1) {
            stringArray.pop()
        }

        for (let word in stringArray) {
            if ("-" === word.charAt(0) && "-" === word.charAt(-1)) {
                word = ""
            }

            if ("(" === word.charAt(0) && ")" === word.charAt(-1)) {
                word = ""
            }
        }
        
        string = stringArray.join(" ")
        
        return string
    }

    getRandomJob(array) {
        const sector = array[this.randomId(array)].children
        const spec = sector[this.randomId(sector)].children
        const subspec = spec[this.randomId(spec)].children

        return subspec[this.randomId(subspec)].text
    }

    async setRandomJobs() {
        const response = await fetch('../json/jobs.json')
        this.json = await response.json()
    
        const jobBefore = document.getElementById("job-before")
        const jobNow    = document.getElementById("job-now")
        const jobDuration = document.getElementById("job-duration")

        const durationMaxNumber = Math.floor(Math.random() * this.durationMax) + 1
        
        jobBefore.innerText = this.removeAfterSlash(this.getRandomJob(this.json))
        jobNow.innerText = this.removeAfterSlash(this.getRandomJob(this.json)).toLowerCase()
        jobDuration.innerText = durationMaxNumber.toString()
    }
}

new Jobs()