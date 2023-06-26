export default async function getDoctorsListData(take: number, skip: number, query: any) {
    const specialityQuery = query.speciality?query.speciality:""
    const slotQuery = query.slot?query.slot:""
    var requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Latitude: '25.21937',
            Longitude: '55.272887'
        },
    };
    
    const api = `https://prodapp.lifepharmacy.com/api/clinics/v1/${query ? `search?speciality=${specialityQuery}&slot=${slotQuery}&clinic_id=&speciality_id=${specialityQuery}&slot_id=${slotQuery}&` : "doctors?"}skip=${skip}&take=${take}&new_method=true`
    console.log(api);
    const res = await fetch(api, requestOptions)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}