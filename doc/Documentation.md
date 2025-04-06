# Documentation

- [Documentation](#documentation)
  - [PassageMetadata](#passagemetadata)
    - [PassageMetadata - `isEnable`](#passagemetadata---isenable)
    - [PassageMetadata - `type`](#passagemetadata---type)
    - [PassageMetadata - `threshold`](#passagemetadata---threshold)
    - [PassageMetadata - `filter`](#passagemetadata---filter)
    - [PassageMetadata - `tags`](#passagemetadata---tags)
    - [PassageMetadata - `groups`](#passagemetadata---groups)
    - [PassageMetadata - `limitationStrategies`](#passagemetadata---limitationstrategies)
  - [Sugarcube widgets](#sugarcube-widgets)
    - [Widget - `<<RE [[PassageName]]>>`](#widget---re-passagename)
    - [Widget - `<<REGroup "GroupName">>`](#widget---regroup-groupname)
    - [Widget - `<<REEnable [[PassageName]]>>`](#widget---reenable-passagename)
    - [Widget - `<<REDisable [[PassageName]]>>`](#widget---redisable-passagename)
    - [Widget - `<<REEnableByTag "TagName">>`](#widget---reenablebytag-tagname)
    - [Widget - `<<REDisableByTag "TagName">>`](#widget---redisablebytag-tagname)
    - [Widget - `<<REReset [[PassageName]]>>`](#widget---rereset-passagename)
    - [Widget - `<<REResetByTag "TagName">>`](#widget---reresetbytag-tagname)

## PassageMetadata

In order for a passage to be added to the list of random events, you need to add the `passage_metadata` tag to the passage tags and at the beginning of the passage `<<PassageMetadata>>JSON Config<</PassageMetadata>>`

Example:

```html
:: ExamplePassage [passage_metadata]
<<PassageMetadata>>{
    isEnabled: true,
    type: "goto",
    threshold: 100,
    filter: `true`,
    tags: ["Place", "Daily", "Weekly", "$currentDayTime"],
    groups: [
        {
            name: "GroupName",
            weight: 10,
            type: "sequential",
            sequentialIndex: 1,
            sequentialCount: 1
        },
    ],
    limitationStrategies: [
        { max: 1, tags: ["Place", "Morning"], isSeparate: true },
        { max: 1, tags: ["Place", "Noon"], isSeparate: true },
        { max: 1, tags: ["Place", "Afternoon"], isSeparate: true },
        { max: 1, tags: ["Place", "Evening"], isSeparate: true },
        { max: 1, tags: ["Place", "Night"], isSeparate: true },
        { max: 1, tags: ["Place", "Daily"], isSeparate: true },
        { max: 1, tags: ["Place", "Weekly"], isSeparate: true },
    ]
}<</PassageMetadata>>
```

### PassageMetadata - `isEnable`

**Syntaxis:** `isEnabled: true,`

**Value type: Boolean** (`true` or `false`)

**Default value:** `true`

**Description:**

Used to set default turn an event on or off.

- Enabled events can be called via [`<<RE [[PassageName]]>>`](#widget---re-passagename) or via [`<<REGroup "GroupName">>`](#widget---regroup-groupname)
- Disable events will be skipped

> [!NOTE]
> Even if an event has been disabled, it can still be navigated to as a normal passage (e.g. via the `[[ExampleEvent]]` link or `<<goto [[ExampleEvent]]>>`)

> [!NOTE]
> To enable/disable events from code use [`<<REEnable [[PassageName]]>>`](#widget---reenable-passagename), [`<<REDisable [[PassageName]]>>`](#widget---redisable-passagename), [`<<REEnableByTag "TagName">>`](#widget---reenablebytag-tagname), [`<<REDisableByTag "TagName">>`](#widget---redisablebytag-tagname)

### PassageMetadata - `type`

**Syntaxis:** `type: "embedded",`

**Value type: Enum** (`"embedded"` or `"goto"`)

**Default value:** `"embedded"`

**Description:**

Used to set how event show.

- Events with `type: "embedded",` will be embade into the passage [`<<RE [[PassageName]]>>`](#widget---re-passagename) or via [`<<REGroup "GroupName">>`](#widget---regroup-groupname) (Example: [Quick start - Step 1 - Embedded events (type: "embedded")](./QuickStart.md#step-1---embedded-events-type-embedded))
- Events with `type: "goto",` will redirect to event passage (Example: [Quick start - Step 2 - Interrupting events (`type: "goto"`))](./QuickStart.md#step-2---interrupting-events-type-goto))

### PassageMetadata - `threshold`

**Syntaxis:** `threshold: 100,`

**Value type: Integer (from 0 to 100) or Twine script** (`10`, `50`, `"$myVariable"`, `"$myVariable + 20"`)

**Default value:** `100`

**Description:**

Used to set percentage probability that an event called via [`<<RE [[PassageName]]>>`](#widget---re-passagename) will be fired

- Events with **integer** `threshold` value will be called with the probability specified in the value
  - Example: `threshold: 30,` means that the event will be called with a 30 percent chance
- Events with **string** `threshold` value will be processed as a Twine script and called with the probability returned as a Twine script result
  - Example 1: ```threshold: `$currentDayTime === "Morning" ? 50 : 20`,``` means that the event will be called with a 50 percent chance when variable `$currentDayTime` is equal `"Morning"`, and percent chance 20 percent chance in all other cases
  - Example 2: ```threshold: `$myVar + 30`,```, if `$myVar` equal 20 then the event will be called with a 50 percent chance

> [!NOTE]
> Widget [`<<REGroup "GroupName">>`](#widget---regroup-groupname) ignores `threshold` value. It uses group `threshold` instead of event `threshold`
> Example: `<<REGroup "GroupName" 50>>` will be called with a 50 percent probability, regardless of what `threshold` value was specified in each event that is in the group

### PassageMetadata - `filter`

**Syntaxis:** ```filter: `true`,```

**Value type: Twine script** (``` `true` ```, ``` `$myVariable > 10` ```)

**Default value:** ``` `true` ```

**Description:**

Used to set filter to check that the event may be fired or skipped.

- If **true** was returned after executing the Twine script from the `filter` field, the event may be fired.
- If return **false**, then event will be skipped.

Examples:

- Example 1: ```filter: `true`,``` - will always return true as a result
- Example 2: ```filter: `$playerLevel > 5`,``` - will return true if variable `$playerLevel` greater than 5
- Example 3: ```filter: `$playerLevel > 5 or $playerMoney > 100`,``` - will return true if variable `$playerLevel` greater than 5 or variable `$playerMoney` greater than 100

> [!NOTE]
> You can write a multiline filter if necessary, but use the backticks for that!
> Use backticks ``` ` ```, but not `'` or `"`

> [!NOTE]
> In some cases when a filter is complex, a good idea is to add comments

> [!NOTE]
> Some logic may be moved to the JS functions and used in the filters

Example of complex multiline filter with JS functions and comments:

```js
{
    filter: `
        ($gameStage === 2 and $playerLevel > 5) or /* comment to main filter */
        myFunction($playerLevel, $someOption) > 10 or /* comment to main filter */
        $isDebugEnabled === true /* this is for debug */
    `,
}
```

### PassageMetadata - `tags`

**Syntaxis:** ```tags: ["Tag1", "Tag2", "$myVariable"],```

**Value type: array of string or Twine script** (`["Tag1"]`, `["$myVariable"]`, `["Tag1", "$myVariable"]`)

**Default value:** Empty

**Description:**

Used to set tags to event.

Tags used in [`limitationStrategies`](#passagemetadata---limitationstrategies) and in widgets [`<<REEnableByTag "TagName">>`](#widget---reenablebytag-tagname), [`<<REDisableByTag "TagName">>`](#widget---redisablebytag-tagname)

Examples:

- Example 1: `tags: ["Kitchen", "Weekly"],` - contain an array of strings `"Kitchen"` and `"Weekly"`
- Example 2: `tags: ["Kitchen", "$currentDayTime"],` - contains array with string `"Kitchen"` and Twine script with variable `$currentDayTime`, this variable will convert to the string value during [`limitationStrategies`](#passagemetadata---limitationstrategies) check

### PassageMetadata - `groups`

**Syntaxis:** `["Group1", "Group2", ...]`

**Value type: array of strings or group objects** (`["Group1"]`, `["Group1", "Group2", ...]`, `[{ json: "" }]`)

**Value types in detailed group definition:**

```js
[
    {
        name: "GroupName",
        weight: 10,
        type: "sequential",
        sequentialIndex: 1,
        sequentialCount: 1
    },
    ...
]
```

- **name** string
- **weight** integer (default: 10)
- **type** enum (`"random"`, `"sequential"`) (default: `"random"`)
- **sequentialIndex**: integer (default: empty)
- **sequentialCount**: integer (default: empty)

**Default value:** Empty

**Description:**

TBD

### PassageMetadata - `limitationStrategies`

**Syntaxis:**

```js
{
    limitationStrategies: [
        { max: 1, tags: ["Place", "Morning"], isSeparate: true },
        { max: 1, tags: ["Place", "Noon"], isSeparate: true },
        { max: 1, tags: ["Place", "Afternoon"], isSeparate: true },
        { max: 1, tags: ["Place", "Evening"], isSeparate: true },
        { max: 1, tags: ["Place", "Night"], isSeparate: true },
        { max: 1, tags: ["Place", "Daily"], isSeparate: true },
        { max: 1, tags: ["Place", "Weekly"], isSeparate: true },
    ]
}
```

**Value type: array of limitation strategy objects:**

```js
{ max: 1, tags: ["Place", "Morning"], isSeparate: true }
```

- **max** integer (default: 1)
- **tags** array of strings (default: empty)
- **isSeparate** boolean (default: false)

**Default value:** Empty

**Description:**

TBD

## Sugarcube widgets

### Widget - `<<RE [[PassageName]]>>`

**Syntaxis:** `<<RE [[PassageName]]>>`

**Description:**

The widget is needed to call the event.

Below is a description of how the event is running:

- Check that the lock was not accrued
  - Lock will be accrued after the first event with `type: "goto"` was running. This is necessary to prevent running several events simultaneously with `type: "goto"`
- Check that the event is enabled
- Check that the event is pass filter
- Check that the event passed the limitation strategies
- Generate a random integer from 0 to 100 value and check that it is greater than the event threshold
- If all checkers were passed, then:
  - Increment counters for limitations strategy and history
  - If the event type is `embedded` then draw the event on the page
  - If the event type is `goto` then acquire the lock and redirect to the event passage

### Widget - `<<REGroup "GroupName">>`

**Syntaxis:** `<<REGroup "GroupName">>`

**Description:**

The widget is needed to call one event of the group of events.

Below is a description of how the group is running:

- Check that the lock was not accrued
  - Lock will be accrued after the first event with `type: "goto"` was running. This is necessary to prevent running several events simultaneously with `type: "goto"`
- Generate a random integer from 0 to 100 value and check that it is greater than the **group threshold**. Events threshold check will be skipped.
- For each event from the group:
  - Check that the event is enabled
  - Check that the event is pass filter
  - Check that the event passed the limitation strategies
  - If all checkers were passed, then add the event to the **winner event array**
- If the group type is `sequential` then:
  - Sort events from **winner event array** by the `sequentialIndex` from the group config
  - Chose the first of events from sorted **winner event array** where `sequentialCount` from the group config is less than the event fired count
  - If the sequence is finished, then works like the group type is `random`
- If the group type is `random` then randomly choose one of the **winner events array** considering the event `weight` from the group config
- Increment counters for limitations strategy and history of the chosen event from the group
  - If the chosen event from the group type is `embedded` then draw the event on the page
  - If the chosen event from the group type is `goto` then acquire the lock and redirect to the event passage

### Widget - `<<REEnable [[PassageName]]>>`

**Syntaxis:** `<<REEnable [[PassageName]]>>`

**Description:**

The widget is needed to enable event by the name.

TBD:

- Useful for enabling single event in one-time events

### Widget - `<<REDisable [[PassageName]]>>`

**Syntaxis:** `<<REDisable [[PassageName]]>>`

**Description:**

The widget is needed to disable event by the name.

TBD:

- Useful for disabling single event in one-time events

### Widget - `<<REEnableByTag "TagName">>`

**Syntaxis:** `<<REEnableByTag "TagName">>`

**Description:**

The widget is needed to enable event by the tag.

TBD:

- Only string tags are used, and no Twine scripts.
- Useful for enabling events during a plot twist.

### Widget - `<<REDisableByTag "TagName">>`

**Syntaxis:** `<<REDisableByTag "TagName">>`

**Description:**

The widget is needed to disable event by the tag.

TBD:

- Only string tags are used, and no Twine scripts.
- Useful for disabling events during a plot twist.

### Widget - `<<REReset [[PassageName]]>>`

**Syntaxis:** `<<REReset [[PassageName]]>>`

**Description:**

The widget is needed to reset counters by the event name. Counters are used in the limitation strategy checker.

TBD

- Don't reset counters with tags at all

### Widget - `<<REResetByTag "TagName">>`

**Syntaxis:** `<<REResetByTag "TagName">>`

**Description:**

The widget is needed to reset counters by the tag. Counters are used in the limitation strategy checker.

TBD
