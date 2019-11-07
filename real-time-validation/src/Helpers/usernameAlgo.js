import axios from 'axios'

let github = []

async function fetchUsers (since) {
    await axios.get(`https://api.github.com/users${since}`)
    .then(res => {
        res.data.forEach(user => {
            github.push(user.login)
        })
        console.log(github)
    })
    .catch(err => {
        console.log(err)
    })
}

const stringValues = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
    g: 16,
    h: 17,
    i: 18,
    j: 19,
    k: 20,
    l: 21,
    m: 22,
    n: 23,
    o: 24,
    p: 25,
    q: 26,
    r: 27,
    s: 28,
    t: 29,
    u: 30,
    v: 31,
    w: 32,
    x: 33,
    y: 34,
    z: 35
}

export function fetchAllUsers () {
    fetchUsers("")
    fetchUsers("?since=46")
    fetchUsers("?since=91")
    fetchUsers("?since=125")
    fetchUsers("?since=156")
    fetchUsers("?since=187")
    fetchUsers("?since=217")
    fetchUsers("?since=247")
    fetchUsers("?since=277")
    fetchUsers("?since=308")
    fetchUsers("?since=338")
    fetchUsers("?since=369")
    fetchUsers("?since=399")
    fetchUsers("?since=430")
    fetchUsers("?since=462")
    fetchUsers("?since=492")
}

export function usernameSearch (username) {
    
}