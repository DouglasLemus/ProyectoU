exports.get404 = (req,res,next)=>{
    const error = new Error ('Not found.');
    error.staticCode = 404;
    next(error);
}

exports.get500 = (error, req,res,next)=>{
    const data = error.data;

    res.status(error.statusCode || 500);
    res.json({
        error:{
            message: error.mesage,
            data: data,
        },
    });
}