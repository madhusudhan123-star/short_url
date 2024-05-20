import {fs, http, express,PORT, url,path} from 'node_request_packages';
import bodyParser from 'body-parser';
import {nanoid} from 'nanoid'; 
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.post('/url', (req, res) => {
    try{
        console.log(req.body.long_url);
        const readfile = fs.readFileSync('urlmap.json', {encoding: "utf-8"});
        const data = JSON.parse(readfile);
        const nano = nanoid(5);
        data[nano] = req.body.long_url; 
        fs.writeFileSync('urlmap.json', JSON.stringify(data), (req,res) =>{
            
        });
        res.json({
            success: true,
            longUrl: `http://localhost:4000/${nano}`
        })

    }catch(err){
        console.log(err);
        res.json({
            success: false,
            message: "Invalid URL"
        })
    }
    
});
app.get('/All_URL', (req, res) => {
    const readfile = fs.readFileSync('urlmap.json', {encoding: "utf-8"});
    const data = JSON.parse(readfile);
    const filteredKeys = Object.keys(data).filter(key => key.length === 5)
    const responseData = filteredKeys.map(key => `http://localhost:4000/${key}`);

    res.json({ success: true, data: responseData  });
//     res.json({
//         success: true,
//         // data: `http://localhost:4000/${id}`
// }); 
});
app.get('/:id', (req, res) => {
    try{
        const readfile = fs.readFileSync('urlmap.json', {encoding: "utf-8"});
        const data = JSON.parse(readfile);
        if(data[req.params.id]){
            res.redirect(data[req.params.id]);
        }else{
            res.json({
                success: false,
                message: "Invalid URL"
            })
        }
    }catch(err){
        console.log(err);
        res.json({
            success: false,
            message: "Invalid URL"
        })
    }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})