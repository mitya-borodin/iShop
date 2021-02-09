<script lang="ts">
  import type { User } from "@rtcts/ishop-shared";
import Button from "../components/Button.svelte";
import Link from "../components/Link.svelte";
import Select from "../components/Select.svelte";
import UserItem from "../components/UserItem.svelte";
import { connect } from "../shared/utils/mobxSvelte";
import { userRepository } from "../stores/user";


  const { autorun } = connect();

  let users: User[] = [];

  $: autorun(() => {
    users = userRepository.list;
  });

  let selectedGroup: string = "Client";
  let selectedUsers: Set<string> = new Set<string>();

  const onSelecteUser = (id: string) => {
    if (selectedUsers.has(id)) {
      selectedUsers.delete(id);
    } else {
      selectedUsers.add(id);
    }

    selectedUsers = selectedUsers;
  };
  const onChangeGroup = (value: string) => {
    selectedGroup = value;
  };
  const onApplyGroup = () => {
    userRepository.updateGroup(Array.from(selectedUsers), selectedGroup);
  };
  const onRemove = (id: string) => {
    userRepository.remove(id);
  };
</script>

<div class="flex flex-col h-screen overflow-hidden bg-gray-100">
  <header class="flex items-end flex-shrink-0 mb-6 bg-white border-b border-gray-300 border-solid">
    <div class="flex flex-col justify-center w-full px-6 pb-3">
      <h1 class="text-4xl font-bold">iShop Admin</h1>
      <Select
        className="mt-3"
        disabled={selectedUsers.size === 0}
        value={selectedGroup}
        onInput={onChangeGroup}
      >
        <option>Client</option>
        <option>Manager</option>
        <option>Admin</option>
      </Select>
      <div class="flex justify-between mt-3">
        <Link href="/system-admin/create-user">
          <Button className="mr-2">Create user</Button>
        </Link>
        <Button disabled={selectedUsers.size === 0} onClick={onApplyGroup}>Apply group</Button>
      </div>
    </div>
  </header>
  <ul class="overflow-auto">
    {#each users as { id, login, group }}
      <UserItem
        {id}
        name={login}
        {group}
        onClick={onSelecteUser}
        {onRemove}
        checked={selectedUsers.has(id || "")}
      />
    {/each}
  </ul>
</div>
