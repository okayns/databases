const util = require('util');
const mysql = require('mysql');
const prompts = require('prompts');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week3DB',
});

const today = new Date();
const date =
  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time =
  today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
const dateTime = date + ' ' + time;

const inputs = [
  {
    type: 'number',
    name: 'firstAccountNumber',
    message: 'Enter First Account Number to Deposit Money(Between 101-105)',
    validate: (name) =>
      name < 101 || name > 105 ? `Enter valid account number` : true,
  },
  {
    type: 'number',
    name: 'moneyAmount',
    message: 'How much money do you want to send?',
  },
  {
    type: 'number',
    name: 'secondAccountNumber',
    message:
      'Enter Second Account Number that you want to send money...(Between 101-105)',
    validate: (name) =>
      name < 101 || name > 105 ? `Enter valid account number` : true,
  },
  {
    type: 'text',
    name: 'remark',
    message: 'Write Something for Remark Column...',
  },
];

const execQuery = util.promisify(connection.query.bind(connection));

async function transaction() {
  try {
    const response = await prompts(inputs);

    const getLatestChangeNumber = `SELECT MAX(change_number) as changeNumber FROM account_changes`;

    let result = await execQuery(getLatestChangeNumber);
    let lastNumber = result[0].changeNumber;

    await execQuery('START TRANSACTION');
    await execQuery(
      `UPDATE account SET balance = balance - ${response.moneyAmount}
       WHERE account_number = ${response.firstAccountNumber}`,
    );
    await execQuery(
      `UPDATE account SET balance = balance + ${response.moneyAmount}
       WHERE account_number = ${response.secondAccountNumber}`,
    );

    await execQuery(`INSERT INTO account_changes SET ?`, {
      change_number: ++lastNumber,
      account_number: response.firstAccountNumber,
      amount: -response.moneyAmount,
      changed_date: dateTime,
      remark: response.remark,
    });
    await execQuery(`INSERT INTO account_changes SET ?`, {
      change_number: ++lastNumber,
      account_number: response.secondAccountNumber,
      amount: +response.moneyAmount,
      changed_date: dateTime,
      remark: response.remark,
    });

    await execQuery('COMMIT');

    console.log(
      `${response.moneyAmount} Euro has been sent to account: ${response.firstAccountNumber} from account: ${response.secondAccountNumber} `,
    );
  } catch (error) {
    console.error(error);
    await execQuery('ROLLBACK');
    connection.end();
  } finally {
    connection.end();
  }
}

transaction();
