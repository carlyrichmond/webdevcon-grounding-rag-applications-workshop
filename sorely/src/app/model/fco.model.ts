export type FCDOResponse = {
    description: string,
    details: {
        alert_status: string[],
        document: {
            url: string
        }
    }
}