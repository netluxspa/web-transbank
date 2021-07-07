const AdminHeaders = () => {

    const adminkey = localStorage.getItem('adminkey');
    const site = localStorage.getItem('site')

    return {
        headers : { 
            'content-type': 'application/json',
            'site': site,
            'adminkey': adminkey
         }
    }
}

export default AdminHeaders;