import { fetchAPI/*, getSetStyleRule*/ } from "../../lib/api";

/*function getSetStyleRule(sheetName, selector, rule) {
    var stylesheet = document.querySelector('link[href*=' + sheetName + ']')
  
    if( stylesheet ){
        stylesheet = stylesheet.sheet
        stylesheet.insertRule(selector + '{ ' + rule + '}', stylesheet.cssRules.length)
    }
  
    return stylesheet
  }*/
  
  // Usage example
  //getSetStyleRule('variables', 'body', 'background:red')

const loadCssVar = async () => { 
  try {
    const [result] = await Promise.all([
      fetchAPI("/options-panel-general-settings-stylings", { 
        populate: {
          GeneralSettingsStyling: { populate: "*" },
        }
      }),
    ]);
    return await result;
  } catch (err) {
    console.log('API CSS Variables  Line-64 - error', err);
  }
}

export default function handler(req, res) {

    //console.log('================================== API/CSS Variables *** req.body === ', req);
    //console.log('================================== API/CSS Variables *** res.body === ', res);

    if (req.method === 'GET') {
                    /*const res = await fetch(`http://127.0.0.1:1337/api/options-panel-general-settings-stylings?nested&populate=*`, config);
                    const data = await res.json();
                    console.log('API CSS Variables  - data === ', data);
                    console.log('API CSS Variables  - data.attributes === ', data.attributes);
                    console.log('API CSS Variables  - res.ok ', res.ok);
                    if (res.ok) {
                      //return data;
                    } */
        //const [res] = 
        return (async() => {
          console.log('1 - function handler(req, res)');
          const data = await loadCssVar();  
          //data => ({status: r.status, body: lala})
          console.log('123 data  = ', data);
          //res.status(200).send({ message: 'Success!', body: data });
          res.status(200).json( { message: 'Success!', body: data } );
          //console.log('22 - function handler res.body', res.body.json);
          console.log('2 - function handler(req, res)');
        })();


/*
        (async() => {
          console.log('1')
          const data = await loadCssVar()  
          //data => ({status: r.status, body: lala})
          return new Promise((resolve, reject) => {
            res.status(200).send({ message: 'Success!', body: data });
            console.log('2')
            resolve();
          });
        })();*/


        /*const data = loadCssVar();
        return new Promise((resolve, reject) => {
          res.status(200).send(data);
          resolve();
        });*/

         /*const data = loadCssVar();
        res.status(200).json(data);*/

                    //  console.log("API CSS Variables  -  getRes ============= ", getRes);
                    //  console.log("API CSS Variables  -  getRes.data ============= ", getRes.data);
                    //  console.log("API CSS Variables  -  getRes.data[0].attributes.GeneralSettingsStyling ============= ", getRes.data[0].attributes.GeneralSettingsStyling);
       // const gss = res.data[0].attributes.GeneralSettingsStyling;
        //console.log("API CSS Variables  -  gss ============= ", gss);
        //console.log("API CSS Variables  -  DATA ============= ", data);
        //console.log("API CSS Variables  -  Method GET ============= ");
        //res.status(200).json({  message: 'Success!' });
        //res.status(200).send({ message: 'Success!' });
        //res.status(200).json({  message: 'Success!', data: datares.data[0] });
                    //res.status(201).json({ message: 'Success!', css_variables: gss});
                    //res.status(200).json({ message: 'Success!', css_variables: gss});
                    //return gss;
                    //getSetStyleRule('variables', 'body', 'background:`$gss.BackgroundColor`'); 
                    //getSetStyleRule('variables', 'body', 'background:red');
                    //getSetStyleRule('variables', 'dark-theme', 'background:red');
                    //throw new Error('Error getting CSS variables.');
      } else {
        console.log('API CSS Variables  MEthod NOT GET');
        res.status(500).json({ error: 'failed to load data'.err })
      }

    //loadCssVar();
    //res.status(200).json({ message: 'Success!', cssVariables: 'Works'});
    //res.status(200).json(req.body);
    
  }