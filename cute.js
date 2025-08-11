const $ = new Env("Cute");
const body = $response.body;
const requestUrl = $request.url;

if(requestUrl.indexOf('/user/info') !== -1) {
    const data = JSON.parse(body);
    data.data.plan_id = 50;
    $.done({body: JSON.stringify(data)})
}






