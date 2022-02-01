module.exports = (name, role, age, portfolio) => {
    
    const portfolioSect = (portfolio) => {
        let fin = ""
        portfolio.forEach(element => {
            fin = fin + element.toString() + "\n";
        });
        return fin;
    }

    return `
** **
<@&938122782863163562>
**__Yeni Stajyer İlanı__**

**Kullanıcı Adı : **${name}
**Rol : **${role}
**Yaş : **${age}
** **
**Portfolyosu : **
${portfolioSect(portfolio)}
    `;
}