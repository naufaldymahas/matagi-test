const updatedDate = (): string => {

    const date: string = new Date().toISOString().replace(/T|Z/g, ' ')
    const nowDate: string = date.replace(/[0-9][0-9]:/, new Date().getHours() + ':')

    return nowDate
}

export default updatedDate