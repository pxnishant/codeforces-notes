modueles.export = (req, res, next) => {
    if(req.type == 'PUT') next();
    if(req.params){
        const groupId = max(req.params.groupId, -1);
        const contestId = req.params.contestId;
        const problemId = req.params.problemId;
        const type = req.params.type;
    } else {
        const groupId = req.body.groupId ? req.body.groupId : -1;
        const contestId = req.body.contestId;
        const problemId = req.body.problemId;
        const type = req.body.type;
    }
    
    const baseURL = "https://codeforces.com/";
    let url = baseURL;
    if(groupId >= 0){
        url += `group/${groupId}/contest/${contestId}/problem/${problemId}`;
    } else {
        if(type == 'gym') {
            url += `gym/${contestId}/problem/${problemId}`;
        } else {
            url += `problemset/problem/${contestId}/${problemId}`
        }
    }

    req.problemLink = url;

    console.log(url)

    next();    
}