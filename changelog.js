const fs = require("fs");

const raw_args = process.argv.slice(2);

const flags = raw_args.filter(arg => arg.startsWith("--")).map(arg => arg.slice(2));
const args = raw_args.filter(arg => !arg.startsWith("--"));

const version = flags.find(a => a.startsWith("v")).slice(2);
const title = flags.find(a => a.startsWith("t")).slice(2);

const changelog_path = "./changelogs/"

if (fs.existsSync(changelog_path + "changelog-latest.json")) {
    const changelog = JSON.parse(fs.readFileSync(changelog_path + "changelog-latest.json"));
    if (changelog.change_version != version) {
        fs.renameSync(changelog_path + "changelog-latest.json", changelog_path + `changelog-${changelog.change_version.replaceAll(".", "-")}.json`)
    }
}

fs.writeFileSync(changelog_path + "changelog-latest.json", JSON.stringify({
    "change_version": version,
    "change_title": title,
    "changes": args
}, null, 4));

const package_data = JSON.parse(fs.readFileSync("./package.json"));
package_data.version = version

fs.writeFileSync("./package.json", JSON.stringify(package_data, null, 4)) 
