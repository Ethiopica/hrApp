import "./Person.css";

const calculateYearsWorked = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();

  const isBeforeAnniversary =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());

  if (isBeforeAnniversary) {
    years--;
  }

  return years >= 0 ? years : 0;
};

const calculateMonthsWorked = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();

  const yearDiff = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  const totalMonths = yearDiff * 12 + monthDiff;

  // Account for partial month
  if (now.getDate() < start.getDate()) {
    return totalMonths - 1;
  }

  return totalMonths;
};

const PersonList = (props) => {
  const yearsWorked = calculateYearsWorked(props.startDate);
  const monthsWorked = calculateMonthsWorked(props.startDate);

  let specialMessage = null;
  if (yearsWorked > 0 && yearsWorked % 5 === 0) {
    specialMessage = (
      <p>🎉 Schedule recognition meeting.</p>
    );
  } else if (monthsWorked < 6) {
    specialMessage = (
      <p>🔔 Schedule probation review.</p>
    );
  }

  return (
    <div className="personList">
      <p>Name: {props.name}</p>
      <p>Title: {props.title}</p>
      <p>Salary: {props.salary}</p>
      <p>Phone: {props.phone}</p>
      <p>Email: {props.email}</p>
      <p>Animal: {props.animal}</p>
      <p>Start Date: {props.startDate}</p>
      <p>Years Worked: {yearsWorked}</p>
      {specialMessage}
      <p>Location: {props.location}</p>
      <p>Department: {props.department}</p>
      <p>Skills: {props.skills.join(", ")}</p>
    </div>
  );
};

export default PersonList;







