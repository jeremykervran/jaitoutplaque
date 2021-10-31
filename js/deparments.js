class Departments {
    constructor () {
        this.url = 'https://geo.api.gouv.fr/departements';
        this.getRandomDepartment()
    }

    /**
     * 
     */
    getRandomDepartment () {
        fetch(this.url)

        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject(response)
            }
        })

        .then((data) =>  {
            let rand = Math.floor(Math.random() * (data.length - 1)) + 1

            const jobDepartment = document.getElementById("job-department")

            let article = this.getDepartmentArticle(data[rand].code)

            jobDepartment.innerText = article + data[rand].nom
        })

        .catch((error) => {
            console.warn('Error fetching API:', error)
        })                   
    }

    getDepartmentArticle(id) {
        const mascDeps = ["14", "15", "18", "25", "29", "30", "32", "39", "41", "45", "46", "47", "49", "56", "59", "62", "63", "67", "68", "69", "81", "82", "83", "84", "90", "94", "95"]
        const femDeps = ["23", "26", "31", "42", "44", "50", "51", "52", "54", "55", "58", "70", "71", "72", "80", "86", "87"]
        const pluralDeps = ["04", "05", "06", "08", "13", "22", "40", "64", "65", "66", "78", "79", "88", "92"]
        const inDeps = ["16", "17", "19", "21", "24", "2A", "2B", "33", "38", "43", "48", "53", "57", "73", "74", "76", "77", "85", "93", "971", "972", "973"]
        const apostrophleDeps = ["01", "02", "03", "07", "09", "10", "11", "12", "27", "28", "34", "35", "36", "37", "60", "61", "89", "91"]
        const atDeps = ["75", "974", "976"]

        if (mascDeps.includes(id)) {
            return 'dans le '
        }

        if (femDeps.includes(id)) {
            return 'dans la '
        }

        if (apostrophleDeps.includes(id)) {
            return "dans l'"
        }

        if (pluralDeps.includes(id)) {
            return 'dans les '
        }

        if (inDeps.includes(id)) {
            return 'en '
        }

        if (atDeps.includes(id)) {
            return 'à '
        }
     }
}

new Departments()