const middlewareTimeandUrl = (req, res, next) => {
    const new_date = new Date()
    console.log('year:', new_date.getFullYear(), 'mounth:', new_date.getMonth() + 1, 'day:', new_date.getDate(), 'hours:',
        new_date.getHours(), 'minutes:', new_date.getMinutes(), 'Request URL:', req.originalUrl)
    next()

};

module.exports = middlewareTimeandUrl;
