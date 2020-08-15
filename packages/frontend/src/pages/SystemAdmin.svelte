<script>
  import Button from "../components/Button.svelte";
  import Link from "../components/Link.svelte";
  import Select from "../components/Select.svelte";
  import UserItem from "../components/UserItem.svelte";

  let selectedUsers = new Set();

  const onSelecteUser = (id) => {
    if (selectedUsers.has(id)) {
      selectedUsers.delete(id);
    } else {
      selectedUsers.add(id);
    }

    selectedUsers = selectedUsers;
  };
</script>

<div class="h-screen bg-gray-100 overflow-hidden flex flex-col">
  <header class="mb-6 flex flex-shrink-0 items-end bg-white border-b border-solid border-gray-300">
    <div class="flex flex-col justify-center w-full px-6 pb-3">
      <h1 class="font-bold text-4xl">iShop Admin</h1>
      <Select className="mt-3" disabled={selectedUsers.size === 0}>
        <option>Manager</option>
        <option>Observer</option>
        <option>Admin</option>
      </Select>
      <div class="flex justify-between mt-3">
        <Button className="mr-2">
          <Link href="/system-admin/create-user">Create user</Link>
        </Button>
        <Button disabled={selectedUsers.size === 0}>Apply group</Button>
      </div>
    </div>
  </header>
  <ul class="overflow-auto">
    <UserItem id="1" onClick={onSelecteUser} checked={selectedUsers.has('1')} />
    <UserItem id="2" onClick={onSelecteUser} checked={selectedUsers.has('2')} />
    <UserItem id="3" onClick={onSelecteUser} checked={selectedUsers.has('3')} />
    <UserItem id="4" onClick={onSelecteUser} checked={selectedUsers.has('4')} />
    <UserItem id="5" onClick={onSelecteUser} checked={selectedUsers.has('5')} />
    <UserItem id="6" onClick={onSelecteUser} checked={selectedUsers.has('6')} />
  </ul>
</div>
