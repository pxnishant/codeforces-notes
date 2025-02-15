module.exports = (req, res, next) => {
    let groupId, contestId, problemId, type;
    if(req.method == 'GET' || req.method == 'PUT'){
        groupId = req.params.groupId;
        contestId = req.params.contestId;
        problemId = req.params.problemId;
        type = req.params.type;
    } else {
        groupId = req.body.groupId || -1;
        contestId = req.body.contestId;
        problemId = req.body.problemId;
        type = req.body.type || " ";
    }
    
    const baseURL = "https://codeforces.com/";
    let url = baseURL;
    if(groupId != -1){
        url += `group/${groupId}/contest/${contestId}/problem/${problemId}`;
    } else {
        if(type == 'gym') {
            url += `gym/${contestId}/problem/${problemId}`;
        } else {
            url += `problemset/problem/${contestId}/${problemId}`
        }
    }

    req.problemLink = url;

    console.log(url);

    next();    
}