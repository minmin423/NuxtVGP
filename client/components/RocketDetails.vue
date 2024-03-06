<template>
    <div v-if="rocket" class="border rounded-b h-full p-4 flex flex-col gap-4">
        <div class="font-semibold text-xl">{{ `${rocket.name} 🚀` }}</div>

        <table class="table-fixed w-full border md:text-lg">
            <tbody>
                <tr class="border-b">
                    <td class="border-r font-semibold">First flight</td>
                    <td class="border-r">{{ formatDate(rocket.first_flight) }}</td>
                    <td class="border-r font-semibold">Height</td>
                    <td v-if="rocket.height">{{ rocket.height.feet + " ft" }}</td>
                </tr>
                <tr class="border-b">
                    <td class="border-r font-semibold">Diameter</td>
                    <td v-if="rocket.diameter" class="border-r">{{ rocket.diameter.feet + " ft" }}</td>
                    <td class="border-r font-semibold">Mass</td>
                    <td v-if="rocket.mass">{{ rocket.mass.kg + " kg" }}</td>
                </tr>
                <tr>
                    <td class="border-r font-semibold">Stages</td>
                    <td class="border-r">{{ rocket.stages }}</td>
                </tr>
            </tbody>
        </table>

        <div class="lg:text-lg">{{ rocket.description }}</div>
    </div>
</template>

<script setup lang="ts">
const rocketId = useRocketId();
// const { rocketId } = defineProps(['rocketId']);

const query = gql`
	query getRocket($rocketId: ID!) {
		rocket(id: $rocketId) {
			id
			name
			description
			first_flight
			height {
				feet
			}
			diameter {
				feet
			}
			mass {
				kg
			}
			stages
		}
	}
`

const { data } = useAsyncQuery<{
	rocket: {
		id: string
		name: string
		description: string
		first_flight: Date
		height: {
			feet: number
		}
		diameter: {
			feet: number
		}
		mass: {
			kg: number
		}
		stages: number
	}
}>(query, { rocketId: rocketId.value })

// const rocket = ref<any>(null);
    const rocket = ref<{
    id: string;
    name: string;
    description: string;
    first_flight: Date;
    height: {
        feet: number;
    };
    diameter: {
        feet: number;
    };
    mass: {
        kg: number;
    };
    stages: number;
} | null>(null);

watch(rocketId, async (newVal) => {
    const { data } = await useAsyncQuery<{
        rocket: {
            id: string
            name: string
            description: string
            first_flight: Date
            height: {
                feet: number
            }
            diameter: {
                feet: number
            }
            mass: {
                kg: number
            }
            stages: number
        }
    }>(query, { rocketId: newVal });

    rocket.value = data.value.rocket ?? null;
});

onMounted(async () => {
    const { data } = await useAsyncQuery<{
        rocket: {
            id: string
            name: string
            description: string
            first_flight: Date
            height: {
                feet: number
            }
            diameter: {
                feet: number
            }
            mass: {
                kg: number
            }
            stages: number
        }
    }>(query, { rocketId: rocketId.value });

    rocket.value = data.value.rocket ?? null;
})

function formatDate(inputDate: Date) {
	const dateObj = new Date(inputDate)
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	const day = dateObj.getDate()
	const monthIndex = dateObj.getMonth()
	const year = dateObj.getFullYear()

	const formattedDate = `${monthNames[monthIndex]} ${day}, ${year}`

	return formattedDate
}
</script>
