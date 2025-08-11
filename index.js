// Slash command to open modal
if (interaction.isChatInputCommand() && interaction.commandName === 'send-announcement') {
  // ✅ Updated to only allow your user ID
  const allowedUserIds = ['1096564278963732573'];

  if (!allowedUserIds.includes(interaction.user.id)) {
    return interaction.reply({
      content: '❌ You are not authorized to use this command.',
      ephemeral: true
    });
  }

  const modal = new ModalBuilder()
    .setCustomId('announcementModal')
    .setTitle('Create Announcement');

  const titleInput = new TextInputBuilder()
    .setCustomId('title')
    .setLabel('Title')
    .setStyle(TextInputStyle.Short)
    .setRequired(false); // still optional

  const descriptionInput = new TextInputBuilder()
    .setCustomId('description')
    .setLabel('Description (supports markdown)')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(false); // still optional

  const thumbnailInput = new TextInputBuilder()
    .setCustomId('thumbnail')
    .setLabel('Thumbnail URL (optional)')
    .setStyle(TextInputStyle.Short)
    .setRequired(false);

  const imageInput = new TextInputBuilder()
    .setCustomId('image')
    .setLabel('Image URL (optional)')
    .setStyle(TextInputStyle.Short)
    .setRequired(false);

  modal.addComponents(
    new ActionRowBuilder().addComponents(titleInput),
    new ActionRowBuilder().addComponents(descriptionInput),
    new ActionRowBuilder().addComponents(thumbnailInput),
    new ActionRowBuilder().addComponents(imageInput)
  );

  await interaction.showModal(modal);
}

// Modal submission handler
if (interaction.isModalSubmit() && interaction.customId === 'announcementModal') {
  const title = interaction.fields.getTextInputValue('title')?.trim();
  const description = interaction.fields.getTextInputValue('description')?.trim();
  const thumbnail = interaction.fields.getTextInputValue('thumbnail')?.trim();
  const image = interaction.fields.getTextInputValue('image')?.trim();

  // ✅ Updated color to black
  const embed = new EmbedBuilder().setColor('#000000');

  if (title) embed.setTitle(title);
  if (description) embed.setDescription(description);
  if (thumbnail) embed.setThumbnail(thumbnail);
  if (image) embed.setImage(image);

  embed.setFooter({
    text: `Announcement by ${interaction.user.username} • ${new Date().toLocaleString()}`
  });

  await interaction.channel.send({
    content: '@everyone',
    embeds: [embed],
    allowedMentions: { parse: ['everyone'] }
  });

  await interaction.reply({
    content: '✅ Announcement sent successfully!',
    ephemeral: true
  });
}
