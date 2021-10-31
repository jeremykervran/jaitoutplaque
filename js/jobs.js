class Jobs {
    constructor() {
        this.json = {}
        this.setRandomJobs()
    }

    randomId(array) {
        return Math.floor(Math.random() * array.length)
    }

    removeAfterSlash(string) {
        const stringArray = string.split(' ')
        console.log(stringArray)

        if (string.indexOf('/') > -1) {
            stringArray.splice(1, 2)
        }
        
        if (stringArray[stringArray.length-1].indexOf('(') > -1) {
            stringArray.pop()
        }
        string = stringArray.join(" ")
        
        return string
    }

    getRandomJob(array) {
        const sector = array[this.randomId(array)].children
        const spec = sector[this.randomId(sector)].children
        const subspec = spec[this.randomId(spec)].children

        const job = subspec[this.randomId(subspec)].text

        return job
    }

    async setRandomJobs() {
        const response = await fetch('../json/metiers.json')
        const jobs = await response.json()
        
        this.json = jobs  
    
        const jobBefore = document.getElementById("job-before")
        const jobNow    = document.getElementById("job-now")
        const jobDuration = document.getElementById("job-duration")
        
        jobBefore.innerHTML = this.removeAfterSlash(this.getRandomJob(jobs))
        jobNow.innerHTML = this.removeAfterSlash(this.getRandomJob(jobs)).toLowerCase()
        jobDuration.innerHTML = Math.floor(Math.random() * 40) + 1
    }
}

new Jobs()