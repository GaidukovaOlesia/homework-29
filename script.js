const roles = {
    admin: "https://www.flaticon.com/svg/static/icons/svg/1424/1424453.svg",
    student: "https://www.flaticon.com/svg/static/icons/svg/1424/1424424.svg",
    lector: "https://www.flaticon.com/svg/static/icons/svg/1424/1424450.svg"
};

const gradation = {
    20: "satisfactory",
    55: "good",
    85: "very-good",
    100: "excellent"
};

const users = [
    {
        name: "Jack Smith",
        age: 23,
        img: "https://www.flaticon.com/free-icon/young-man_4440953?term=man&page=1&position=4&origin=tag&related_id=4440953",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 20
            },
            {
                "title": "Java Enterprise",
                "mark": 100
            }
        ]
    },
    {
        name: "Amal Smith",
        age: 20,
        img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922656.svg",
        role: "student"
    },
    {
        name: "Noah Smith",
        age: 43,
        img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922616.svg",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 50
            }
        ]
    },
    {
        name: "Charlie Smith",
        age: 18,
        img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922688.svg",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 75
            },
            {
                "title": "Java Enterprise",
                "mark": 23
            }]
    },
    {
        name: "Emily Smith",
        age: 30,
        img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922565.svg",
        role: "admin",
        courses: [
            {
                "title": "Front-end Pro",
                "score": 10,
                "lector": "Leo Smith"
            },
            {
                "title": "Java Enterprise",
                "score": 50,
                "lector": "David Smith"
            },
            {
                "title": "QA",
                "score": 75,
                "lector": "Emilie Smith"
            }]
    },
    {
        name: "Leo Smith",
        age: 253,
        img: "https://www.flaticon.com/free-icon/boss_265674?term=man&page=1&position=8&origin=tag&related_id=265674",
        role: "lector",
        courses: [
            {
                "title": "Front-end Pro",
                "score": 78,
                "studentsScore": 79
            },
            {
                "title": "Java Enterprise",
                "score": 85,
                "studentsScore": 85
            }
        ]
    }
];
// debugger;
class User {
    constructor(user) {
        // debugger;
        this.name = user.name;
        this.age = user.age;
        this.img = user.img;
        this.role = user.role;
        if(user.courses) this.courses = user.courses;
    }
    render() {
        // debugger;
        return `
        <div class="users">
            <div class="user">
                <div class="user__info">
                    <div class="user__info--data">
                        <img src="${this.img}" alt="${this.name}">
                        <div class="user__naming">
                            <p>"Name": <b>${this.name}</b></p>
                            <p>"Age": <b>${this.age}</b></p>
                        </div>
                    </div>
                    <div class="user__info--role">
                        <img src="${roles[this.role]}  " alt="${this.role}" height="25">
                        <p> ${this.role}  </p>
                    </div>
                </div>
            
                <div class="user__courses">
                    ${this.courses ? this.renderCourses() : ""}
                </div>
            </div>
       
               `
}
    renderCourses() {
        // debugger;
        let list = this.courses
            .map(item => {
                return `
                <p class="user__courses--course ${this.role}">${item.title}
                    <span class="${userGrade(gradation, item.mark)}">${userGrade(gradation, item.mark)}</span>
                </p>`;
            })
            .join("");
        return `<div class="user__courses">${list}</div>`
}
}

function userGrade(gradation, mark) {
    // debugger;

    for(let key in gradation) {
        if(mark > 0 && mark <= 20) {
            return  "satisfactory"
        }
        if(mark > 20 && mark <= 55) {
            return "good"
        }
        if(mark > 55 && mark <= 85) {
            return "very-good"
        }
        if(mark > 85 && mark <= 100) {
            return "excellent"
        }

    }
}

class Student extends User {
    constructor(user) {
        super(user);
    }
}

class Admin extends User {
    constructor(user) {
        super(user);
    }
    renderCourses() {
        // debugger;
        let list = this.courses
            .map(item => {
                return `
                <div class="user__courses--course ${this.role}">
                    <p>Title: <b>${item.title}</b></p>
                    <p>Admin's score: <span class="${userGrade(gradation, item.score)}">${userGrade(gradation, item.score)}</span></p>
                   <p>Lector: <b>${item.lector}</b></p>
                </div>`;
            })
            .join("");
        return `<div class="user__courses admin--info">${list}</div>`
    }
}

class Lector extends User {
    constructor(user) {
        super(user);
    }

    renderCourses() {
        // debugger;
        let list = this.courses
            .map(item => {
                debugger;
                return `
                <div class="user__courses--course ${this.role}">
                    <p>Title: <b>${item.title}</b></p>
                    <p>Lector's score: <span class="${userGrade(gradation, item.score)}">${userGrade(gradation, item.score)}</span></p>
                   <p>Average student's score:  <b>${userGrade(gradation, item.studentsScore)}</b></p>
                </div>`;
            })
            .join("");
        return `<div class="user__courses admin--info">${list}</div>`
    }
}

const ROLES = {
    "student": user => new Student(user),
    "admin": user => new Admin(user),
    "lector": user => new Lector(user),
}
function renderUsers (arr) {
    // debugger;
    let users = arr
        .map(user => ROLES[user.role] ? ROLES[user.role](user) : new User(user))
        .map(user => {
            console.log(user);
            return user;
        }
        )
        .map(user => user.render())
        .join("");
    document.write(users);
}
renderUsers(users);

