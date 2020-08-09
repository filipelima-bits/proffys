const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    // Inserir dados

    proffyValue = {
        name: "Filipe Lima",
        avatar: "https://avatars2.githubusercontent.com/u/62335242?s=460&u=fcebd2214dd769b215f99c1eba3eed3077347ad9&v=4",
        whatsapp: "99988674532",
        bio: "Instrutor de Química",
    }

    classValue = {
        subject: "Química",
        cost: "20",
        // O proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        // Class id virá pelo banco de dados após cadastrarmos a aula
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar dados inseridos

    // Todos os Proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    // Consultar as classes de um determinado professor e os dados dele

    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    // O horário que a pessoa trabalha, por exemplo, é das 8 as 18
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "620"
    `)

    console.log(selectClassesSchedules)
})