const departmentShortForms = {
    cs: "Computer Science",
    aa: "Aeronautics and Astronautics",
    ee: "Electrical Engineering",
    mse: "Materials Science and Engineering",
    me: "Mechanical Engineering",
    ae: "Avionics Engineering",
    ss: "Space Science",
    ams: "Applied Mathematics & Statistics",
    hs: "Humanities & Sciences"
};

const departmentOptions = Object.values(departmentShortForms);

function checkDepartmentKeywords(lowerDept) {
    if (lowerDept.includes("cs")) {
        return "Computer Science";
    } else if (lowerDept.includes("aa")) {
        return "Aeronautics and Astronautics";
    } else if (lowerDept.includes("ee")) {
        return "Electrical Engineering";
    } else if (lowerDept.includes("mse")) {
        return "Materials Science and Engineering";
    } else if (lowerDept.includes("me")) {
        return "Mechanical Engineering";
    } else if (lowerDept.includes("ae")) {
        return "Avionics Engineering";
    } else if (lowerDept.includes("ss")) {
        return "Space Science";
    } else if (lowerDept.includes("ams")) {
        return "Applied Mathematics & Statistics";
    } else if (lowerDept.includes("hs")) {
        return "Humanities & Sciences";
    }
    return null;
}

function getFullDepartmentName(department) {
    const lowerDept = department.toLowerCase();

    const keywordMatch = checkDepartmentKeywords(lowerDept);
    if (keywordMatch) return keywordMatch;

    const matchedDepartment = departmentOptions.find(dep =>
        dep.toLowerCase().includes(lowerDept)
    );
    return matchedDepartment || department; // Return matched or original input
}

export default getFullDepartmentName;