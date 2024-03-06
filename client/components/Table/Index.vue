<template>
    <div>
        <div class="w-full flex justify-end items-center gap-4 pb-2">
            <div class="flex items-center gap-2">
                <Icon icon="akar-icons:sort" class="h-8 w-8 text-gray-400" />
                <select v-model="yearSort" class="border rounded h-10 px-2 w-48" name="sort">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div class="flex items-center gap-2">
                <Icon icon="solar:filter-bold" class="h-8 w-8 text-gray-400" />
                <input class="border rounded h-10 px-2" type="select" v-model="yearFilter" placeholder="Filter by year">
            </div>
        </div>
        
        <table v-if="paginatedLaunches.length !== 0" class="w-full border-x">
            <thead class="bg-slate-200">
                <tr>
                    <TableHead>Mission Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead>Rocket Name</TableHead>
                    <TableHead>Details</TableHead>
                </tr>
            </thead>
            <tbody>
                <tr @click="toggleDetailsVisibility(launch.id)" class="h-20 cursor-pointer hover:bg-blue-50 border-b text-center transition-color duration-150 ease-in-out" 
                :class="{ '!h-40' : showDetails === launch.id }"
                v-for="launch in paginatedLaunches" :key="launch.id">
                    <TableCell  class="w-1/6">{{ launch.mission_name }}</TableCell>
                    <TableCell  class="w-1/6">{{ formatDate(launch.launch_date_local) }}</TableCell>
                    <TableCell  class="w-1/6">{{ launch.launch_site ? launch.launch_site.site_name : 'None specified' }}</TableCell>
                    <TableCell class="w-1/6">{{ launch.rocket.rocket_name }}</TableCell>
                    <TableCell class="w-2/6">{{ showDetails === launch.id ? (launch.details ? launch.details : 'No details available.') : truncateDetails(launch.details) }}</TableCell>
                </tr>
            </tbody>
        </table>

        <div v-if="paginatedLaunches.length !== 0" class="flex justify-center items-center mt-2 mb-4">
            <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 border rounded hover:bg-gray-200 disabled:bg-gray-200">Previous</button>
            <div class="px-3 py-1 text-center font-semibold w-10">{{ currentPage }}</div>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="px-5 py-1 border rounded hover:bg-gray-200 disabled:bg-gray-300">Next</button>
        </div>

        <div v-else class="w-full border flex items-center justify-center py-20 text-xl font-semibold">No Launches found.</div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useYearSort } from '~/composables/useYearSort';

const query = gql`
	query getLaunches {
		launches {
			id
			mission_name
			launch_site {
				site_name
			}
			launch_date_local
			rocket {
				rocket_name
			}
			details
		}
	}
`

const { data } = useAsyncQuery<{
	launches: {
		id: string
		mission_name: string
		launch_date_local: Date
		launch_site: {
			site_name: string
		}
		rocket: {
			rocket_name: string
		}
		details: string
	}[]
}>(query)

const launches = computed(() => data.value?.launches ?? []);
const totalPages = computed(() => Math.ceil(launches.value.length / itemsPerPage));

const showDetails = ref('');
const itemsPerPage = 10;
const currentPage = ref(1); 
const yearFilter = useYearFilter();
const yearSort = useYearSort();

const paginatedLaunches = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedFilteredLaunches.value.slice(startIndex, endIndex);
});

const sortedFilteredLaunches = computed(() => {
    let filteredLaunches = yearFilter.value ? launches.value.filter(launch => {
        const launchYear = new Date(launch.launch_date_local).getFullYear();
        return launchYear === parseInt(yearFilter.value!);
    }) : [...launches.value];

    if (yearSort.value === 'asc') {
        filteredLaunches.sort((a, b) => {
            const yearA = new Date(a.launch_date_local).getFullYear();
            const yearB = new Date(b.launch_date_local).getFullYear();
            return yearA - yearB;
        });
    } else {
        filteredLaunches.sort((a, b) => {
            const yearA = new Date(a.launch_date_local).getFullYear();
            const yearB = new Date(b.launch_date_local).getFullYear();
            return yearB - yearA;
        });
    }

    return filteredLaunches;
});

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const toggleDetailsVisibility = (launchId: string): void => {
    if(showDetails.value !== launchId) {
        showDetails.value = launchId;
        return;
    }
    
    showDetails.value = '';
};

const truncateDetails = (details: string | undefined): string => {
    if (details && details.length > 0) {
        const maxLength = 50;
        if (details.length > maxLength) {
            return details.substring(0, maxLength) + '...';
        } else {
            return details;
        }
    } else {
        return 'No details available.';
    }
};

function formatDate(input: Date): string {
    const date = new Date(input);
    const options: Intl.DateTimeFormatOptions = {
        weekday: undefined,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    };
    const formattedDate = date.toLocaleString('en-US', options);

    // Splitting date and time parts
    const [datePart, timePart] = formattedDate.split('at ');

    return `${datePart} - ${timePart}`;
};
</script>