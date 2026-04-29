import LocationCard from './LocationCard'

const LOCATIONS = [
  {
    id: 'akurdi',
    name: 'Akurdi',
    subLocations: ['R&D', 'DDC', 'Chetak Plant', 'Utsah', 'Library', 'Old Corp', 'Transport'],
  },
  {
    id: 'chakan',
    name: 'Chakan',
    subLocations: ['Plant 1', 'Plant 2', 'Chakan R&D'],
  },
  {
    id: 'waluj',
    name: 'Waluj',
    subLocations: ['Waluj Plant', 'Admin Block'],
  },
  {
    id: 'pantnagar',
    name: 'Pantnagar',
    subLocations: ['Plant', 'Township'],
  },
  {
    id: 'bangalore',
    name: 'Bangalore',
    subLocations: ['Bangalore Office'],
  },
  {
    id: 'regional-offices',
    name: 'Regional Offices',
    subLocations: ['Mumbai RO', 'Delhi RO', 'Chennai RO', 'Kolkata RO'],
  },
]

export default function LocationsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {LOCATIONS.map((loc) => <LocationCard key={loc.id} {...loc} />)}
    </div>
  )
}
