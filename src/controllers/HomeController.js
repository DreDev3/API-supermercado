class HomeController {
 async index(req, res) {
    res.json('produtos');
  }
}


export default new HomeController();
