import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/RemoveCircleOutline';
import { Link } from 'react-router-dom';
import income from './income.svg';
import expense from './expense.svg';
import total from './total.svg';
import { red } from '@material-ui/core/colors';
import './helpers'
import { Utils } from './helpers';
import Footer from '../Footer';
import { getTransactions, removeTransaction } from '../apis';
import { toast } from 'react-toastify';

export interface IValues {
    id: number,
    description: string,
    value: number,
    date: string,
}

let valueSignal = "";

function Home() {

    const [data, setData] = useState<IValues[]>([]);

    let totalValue = 0
    let totalIncome = 0;
    let totalExpense = 0;

    useEffect(() => {
        getTransactions()
            .then(transactions => setData(transactions.data))
            .catch(() => {
                toast.warning('Erro ao recuperar transações.');
            })
    }, []);


    data.map(transactions => {

        totalValue += Utils.formatAmount(transactions.value)        

        if (transactions.value > 0) {
            valueSignal = "income"
            totalIncome += Utils.formatAmount(transactions.value)
        }
        else {
            valueSignal = "expense"
            totalExpense += Utils.formatAmount(transactions.value)
        }
    })

    const deleteTransaction = (event: any, id: number) => {
        event.preventDefault();
        removeTransaction(id)
            .then(transactions => {
                transactions.data.filter((item: { id: number; }) => item.id !== id);
                setData(transactions.data);
            })
    }

    return (
        <>
            <main className="container" >
                <section id="balance">
                    <h2 className="sr-only">Balanço</h2>

                    <div className="card">
                        <h3>
                            <span>Entradas</span>
                            <img src={income} alt="Image de entradas" />
                        </h3>
                        <p id="incomeDisplay">{Utils.formatCurrency(totalIncome)}</p>
                    </div>

                    <div className="card">
                        <h3>
                            <span>Saídas</span>
                            <img src={expense} alt="Image de saídas" />
                        </h3>
                        <p id="expenseDisplay">{Utils.formatCurrency(totalExpense)}</p>
                    </div>

                    <div className="card total">
                        <h3>
                            <span>Total</span>
                            <img src={total} alt="Image de total" />
                        </h3>
                        <p id="totalDisplay">{Utils.formatCurrency(totalValue)}</p>
                    </div>
                </section>
                <Link className="link-create" to={'/transactions'}> + Nova Transação </Link>

                <TableContainer component={Paper}>
                    <Table id="data-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Descrição</TableCell>
                                <TableCell align="left">Valor</TableCell>
                                <TableCell align="left">Data</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(transactions => (
                                <TableRow key={transactions.id}>
                                    <TableCell align="left">{transactions.description}</TableCell>
                                    <TableCell className={Utils.cssClass(transactions.value)} align="left">
                                        {Utils.formatCurrency(transactions.value)}
                                    </TableCell>
                                    <TableCell align="left">{Utils.formatDate(transactions.date)}</TableCell>
                                    <TableCell align="left">
                                        <DeleteIcon onClick={e => deleteTransaction(e, transactions.id)} style={{ color: red[500] }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Footer />
            </main >
        </>
    );

}

export default Home;
