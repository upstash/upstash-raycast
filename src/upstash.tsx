import { MenuBarExtra, open } from "@raycast/api";
import { Database, State, Vector } from "../types/types";
import { useData } from "../hooks/use-data";

export default function Command() {
  const { redis, vector, isLoading } = useData();

  return (
    <MenuBarExtra icon="upstash-icon.png" isLoading={isLoading}>
      <MenuBarExtra.Section title="Redis">
        {redis
          .filter((o) => o.state === State.Active)
          .map((db: Database) => (
            <MenuBarExtra.Item
              key={db.database_id}
              icon="redis.png"
              title={db.database_name}
              subtitle={`→ ${db.endpoint}`}
              onAction={() => open(`https://console.upstash.com/redis/${db.database_id}`)}
            />
          ))}
        {redis
          .filter((o) => o.state !== State.Active)
          .map((db: Database) => (
            <MenuBarExtra.Item
              key={db.database_id}
              icon="redis-gray.png"
              title={db.database_name}
              subtitle={`→ ${db.endpoint}`}
              // onAction={() => open(`https://console.upstash.com/redis/${db.database_id}`)}
            />
          ))}
      </MenuBarExtra.Section>

      <MenuBarExtra.Section title="Vector">
        {redis.length === 0 ? (
          <MenuBarExtra.Item icon="vector-gray.png" title="No Vector Databases" />
        ) : (
          <>
            {vector.map((vector: Vector) => (
              <MenuBarExtra.Item
                key={vector.id}
                icon="vector.png"
                title={vector.name}
                subtitle={`→ ${vector.endpoint}`}
                onAction={() => open(`https://console.upstash.com/vector/${vector.id}`)}
              />
            ))}
          </>
        )}
      </MenuBarExtra.Section>

      {/*<MenuBarExtra.Section title="QStash">
        <MenuBarExtra.Item
          icon="qstash.png"
          title="QStash"
          onAction={() => open(`https://console.upstash.com/qstash`)}
        />
      </MenuBarExtra.Section>*/}

      <MenuBarExtra.Section title="Upstash">
        <MenuBarExtra.Item
          icon="brand-discord.png"
          title="Join Our Community"
          onAction={() => open(`https://discord.gg/VXyFZpQvPq`)}
        />
        <MenuBarExtra.Item icon="brand-x.png" title="Follow Us" onAction={() => open(`https://x.com/upstash`)} />
      </MenuBarExtra.Section>
    </MenuBarExtra>
  );
}
