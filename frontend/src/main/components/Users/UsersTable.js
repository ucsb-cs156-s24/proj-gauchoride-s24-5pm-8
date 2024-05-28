import OurTable, { ButtonColumn } from "main/components/OurTable"
import { useBackendMutation } from "main/utils/useBackend";
import React, { useState } from 'react'; // Added missing imports



export default function UsersTable({ users}) {
    // const [sortedUsers, setSortedUsers] = useState(users);
    const [sort, ] = useState({ keyToSort: 'id', direction: 'asc' });

    // useEffect(() => {
    //     setSortedUsers(sortTableById(users, sort));
    // }, [users, sort]);

    function cellToAxiosParamsToggleRider(cell) {
        return {
            url: "/api/admin/users/toggleRider",
            method: "POST",
            params: {
                id: cell.row.values.id
            }
        }
    }
    // Stryker disable all : hard to test for query caching
    const toggleRiderMutation = useBackendMutation(
        cellToAxiosParamsToggleRider,
        {},
        ["/api/admin/users"]
    );
    // Stryker enable all 

     // Stryker disable next-line all : TODO try to make a good test for this
    const toggleRiderCallback = async (cell) => { toggleRiderMutation.mutate(cell); }

    //toggleAdmin
    function cellToAxiosParamsToggleAdmin(cell) {
        return {
            url: "/api/admin/users/toggleAdmin",
            method: "POST",
            params: {
                id: cell.row.values.id
            }
        }
    }

    // Stryker disable all : hard to test for query caching
    const toggleAdminMutation = useBackendMutation(
        cellToAxiosParamsToggleAdmin,
        {},
        ["/api/admin/users"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const toggleAdminCallback = async (cell) => { toggleAdminMutation.mutate(cell); }


    //toggleDriver
    function cellToAxiosParamsToggleDriver(cell) {
        return {
            url: "/api/admin/users/toggleDriver",
            method: "POST",
            params: {
                id: cell.row.values.id
            }
        }
    }

    // Stryker disable all : hard to test for query caching
    const toggleDriverMutation = useBackendMutation(
        cellToAxiosParamsToggleDriver,
        {},
        ["/api/admin/users"],
    );
    // Stryker enable all 

    // function sortArray(array) {
    //     return [...array].sort((a, b) => a.id - b.id);
    // }

    function sortTableById(array, sort) {
        const { keyToSort, direction } = sort;
        if (direction == 'asc') {
            return [...array].sort((a, b) => a[keyToSort] - b[keyToSort]);
        }
    }


    // Stryker disable next-line all : TODO try to make a good test for this
    const toggleDriverCallback = async (cell) => { 
        await toggleDriverMutation.mutate(cell);
        users = (sortTableById(users, sort)); // Sort after toggling driver
    };


    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'First Name',
            accessor: 'givenName',
        },
        {
            Header: 'Last Name',
            accessor: 'familyName',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Admin',
            id: 'admin',
            accessor: (row, _rowIndex) => String(row.admin) // hack needed for boolean values to show up
        },
        {
            Header: 'Driver',
            id: 'driver',
            accessor: (row, _rowIndex) => String(row.driver) // hack needed for boolean values to show up
        },
        {
            Header: 'Rider',
            id: 'rider',
            accessor: (row, _rowIndex) => String(row.rider) // hack needed for boolean values to show up
        }
    ];

    const buttonColumn = [
        ...columns,
        ButtonColumn("Toggle Admin", "primary", toggleAdminCallback, "UsersTable"),
        ButtonColumn("Toggle Driver", "success", toggleDriverCallback, "UsersTable"),
        ButtonColumn("Toggle Rider", "danger", toggleRiderCallback, "UsersTable")
    ]

    //const columnsToDisplay = showButtons ? buttonColumn : columns;

    return <OurTable
        data={sortTableById(users, sort)}
        columns={buttonColumn}
        testid={"UsersTable"}
    />;
};